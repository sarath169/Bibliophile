import os
import requests
import logging
import dotenv

from django.db import connection
from django.db.models import Q, Avg, Count
from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

from books.config import LOG_LEVEL, LOG_FORMAT, LOG_DT_FORMAT
from books.serializers import BookSerializer, BookShelfSerializer, ReviewSerializer
from books.models import Book, BookShelf, Review
from authentication.models import User
from search.views import GetBookDetails

dotenv.load_dotenv()
class GetBookAPIView(APIView):
    """
    Get Either a single book or all available books in the database
    """
    def get(self, request, book_id=None):
        """
        Returns all books if book_id is not provided. Else return the specific book.
        :param request: Request Object
        :param book_id: str, id of a book
        :return: all books if book_id is not provided. Else return the specific book.
        """
        if book_id:
            try:
                book = Book.objects.get(pk=book_id)
                serializer = BookSerializer(book)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Book.DoesNotExist:
                return Response({"msg": "Book Not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            books = Book.objects.all()
            serializer = BookSerializer(books, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


class AddBookAPIView(APIView):
    """
    Fetch the book details from Gooogle books API and add it to the database, if not available. Also add the book to the
    shelf of a user if already not exists.
    """
    permission_classes = (IsAuthenticated, )
    logging.basicConfig(level=LOG_LEVEL, format=LOG_FORMAT, datefmt=LOG_DT_FORMAT)

    def get_user(self, token):
        """
        Return user_id based on token
        :param token: Authentication token of a user
        :return: user_id
        """
        try:
            user_id = Token.objects.get(key=token).user_id
            return user_id
        except User.DoesNotExist:
            return None

    def post(self, request):
        """
        Fetch book from google books api and store it in the database
        :param request: request object
        :return: The last book shelf entry on success.
        """
        token = request.auth.key
        book_id = request.data.get("book_id")
        shelf_type = request.data.get("shelf_type")
        user_id = self.get_user(token)
        print(book_id,shelf_type, user_id)

        # print(url, "url")
        book_exists = Book.objects.filter(id=book_id)

        shelf = BookShelf.objects.filter(Q(book_id=book_id) & Q(user_id=user_id))

        if not book_exists:
            get_book_details = GetBookDetails()
            book_to_save = get_book_details.getDetails(book_id)
            if book_to_save:
                book_serializer = BookSerializer(data=book_to_save)
                if book_serializer.is_valid():
                    book_serializer.save()
                else:
                    return Response(book_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"msg": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

        if not shelf:
            book_to_shelf = {
                'book': book_id,
                'user': user_id,
                'book_in_shelf': shelf_type
            }
            serializer = BookShelfSerializer(data=book_to_shelf)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"msg": "Book is already available in one of your shelf"})


class GetUsersBookAPIView(APIView):
    """
    Fetch all books for a specific user
    """
    # permission_classes = (IsAuthenticated, )

    def get(self, request, user_id):
        """
        For a specific user return all books after grouping them based on the shelf type
        :param request: request object
        :param user_id: int, id of an user
        :return: dict, all books of an user
        """
        books = BookShelf.objects.select_related().filter(user_id=user_id)

        RL = []
        WL = []
        SL = []
        for book in books:
            temp_book = {
                "id": book.book.id,
                "title": book.book.title,
                "author": book.book.author,
                "description": book.book.description,
                "page_count": book.book.page_count,
                "category": book.book.category,
                "image_link_small": book.book.image_link_small,
            }
            if book.book_in_shelf == "RL":
                RL.append(temp_book)
            elif book.book_in_shelf == "WL":
                WL.append(temp_book)
            else:
                SL.append(temp_book)
        book_shelf = {"RL": RL, "WL": WL, "SL": SL}
        return JsonResponse(book_shelf, status=status.HTTP_200_OK, safe=False)


class AddReviewAPIView(APIView):
    """
    Add or Update reviews of a book
    """
    permission_classes = (IsAuthenticated,)

    def get_user(self, token):
        """
        Return user_id based on token
        :param token: Authentication token of a user
        :return: user_id
        """
        try:
            user_id = Token.objects.get(key=token).user_id
            return user_id
        except User.DoesNotExist:
            return None

    def post(self, request):
        """
        Add or Update rating and comment to a book
        :param request: request object
        :return: Last saved review
        """
        token = request.auth.key
        user_id = self.get_user(token)
        book_id = request.data.get("book_id")
        book = Book.objects.filter(id=book_id)
        if not book:
            return Response({"msg": "Invalid Book"}, status=status.HTTP_404_NOT_FOUND)

        if user_id:
            rating = request.data.get("rating")
            comment = request.data.get("comment")
            review = {
                "rating": rating,
                "comment": comment,
                "user": user_id,
                "book": book_id
            }

            serializer = ReviewSerializer(data=review)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"msg": "Invalid Token"}, status=status.HTTP_404_NOT_FOUND)


class BooksReviewAPIView(APIView):
    """
    Get reviews of a book
    """
    def get(self, request, book_id):
        """
        Return all the ratings and comments of a book along with their respective user's id and name
        :param request: request object
        :param book_id: str, id of a book
        :return: dict, reviews of a book along with user details
        """
        reviews = Review.objects.select_related().filter(book=book_id).order_by('-updated_at')
        if not reviews:
            return Response({"msg": "Book not found"}, status=status.HTTP_404_NOT_FOUND)
        bid = None
        book_title = None
        book_reviews = []
        for review in reviews:
            bid = review.book.id
            book_title = review.book.title
            if review.user.profile_picture:
                img_url = review.user.profile_picture.url
            else:
                img_url = ""
            rvw = {
                "user_id": review.user.id,
                "user_name": review.user.name,
                "user_image": img_url,
                "user_url": review.user.public_url,
                "rating": review.rating,
                "comment": review.comment,
                "reviewed_at": review.created_at
            }
            book_reviews.append(rvw)
        send_reviews = {
            "book_id": bid,
            "book_title": book_title,
            "reviews": book_reviews
        }
        return Response(send_reviews, status=status.HTTP_200_OK)


class UsersReviewAPIView(APIView):
    """
    Fetch all the reviews made by a specific user
    """
    # permission_classes = (IsAuthenticated, )

    def get(self, request, user_id):
        """
        Returns all the ratings and comments done by a specific user
        :param request: request object
        :param user_id: int, id of an user
        :return: dict, user_id and all reviews
        """
        reviews = Review.objects.select_related().filter(user=user_id).order_by('-updated_at')
        if not reviews:
            return Response({"msg": "No reviews found"}, status=status.HTTP_404_NOT_FOUND)
        users_review = []
        for review in reviews:
            rvw = {
                "book_id": review.book.id,
                "book_title": review.book.title,
                "book_image": review.book.image_link_small,
                "rating": review.rating,
                "comment": review.comment,
                "reviewed_at": review.created_at
            }
            users_review.append(rvw)
        send_review = {"user_id": user_id, "reviews": users_review}
        return Response(send_review, status=status.HTTP_200_OK)


class TopTenPopularBooksAPIView(APIView):
    """
    Fetch Top 10 Books based on number of appearances in multiple user's shelf
    """
    def get(self, request):
        """
        Return top ten popular books
        :param request: request object
        :return: dict, top ten popular books
        """
        qs_books = BookShelf.objects.values("book_id").annotate(book_count=Count('book_id')).order_by('-book_count')[:10]

        book_list = []
        for book in qs_books:
            book_list.append(book.get("book_id"))

        book_details = Book.objects.values('id', 'title', 'author', 'description', 'image_link_small').filter(
            id__in=book_list)
        return Response(book_details, status=status.HTTP_200_OK)


class TopTenRatedBooksAPIView(APIView):
    """
    Get top ten best rated books
    """
    def get(self, request):
        """
        Return top ten best rated books
        :param request: request object
        :return: dict, top ten best rated books
        """
        books = Review.objects.values('book').annotate(avg_rating=Avg('rating')).order_by('-avg_rating')[:10]
        book_list = []
        for book in books:
            book_list.append(book.get("book"))

        book_details = Book.objects.values('id', 'title', 'author', 'description', 'image_link_small').filter(id__in=book_list)
        return Response(book_details, status=status.HTTP_200_OK)


class LastTenReviewsAPIView(APIView):
    """
    Get Most recent reviews
    """
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        """
        Returns 10 most recent reviews
        :param request: request object
        :return: dict, 10 most recent reviews
        """
        reviews = Review.objects.select_related().order_by('-id')[:10]
        most_recent_review = []
        for review in reviews:
            tmp_book = {
                "book_id": review.book_id,
                "book_title": review.book.title,
                "user_id": review.user_id,
                "user_name": review.user.name,
                "rating": review.rating,
                "comment": review.comment
            }
            most_recent_review.append(tmp_book)

        return Response(most_recent_review, status=status.HTTP_200_OK)
