import os
import requests
import logging
from django.db import connection
from django.db.models import Q
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
        # print(book_id,shelf_type, user_id)

        url = os.getenv('GOOGLE_BOOK_SELF_LINK')
        url = f'{url}/{book_id}'
        book_exists = Book.objects.filter(id=book_id)

        shelf = BookShelf.objects.filter(Q(book_id=book_id) & Q(user_id=user_id))

        if not book_exists:
            book = None
            try:
                res = requests.get(url)
                book = res.json()
            except Exception as ex:
                logging.debug(str(ex))

            if book:
                book_to_save={}
                book_to_save["id"] = book["id"]
                book_to_save["title"] = book["volumeInfo"].get("title")
                volume_info = book["volumeInfo"]
                authors = volume_info.get("authors")
                author = ', '.join([str(a) for a in authors])
                book_to_save["author"] = author
                book_to_save["publisher"] = volume_info.get("publisher")
                book_to_save["description"] = volume_info.get("description")
                book_to_save["page_count"] = volume_info.get("pageCount")
                book_to_save["category"] = volume_info["categories"][0] if volume_info.get("categories") else "Unknown"
                book_to_save["image_link_small"] = volume_info.get("imageLinks").get("smallThumbnail")
                book_to_save["image_link_large"] = volume_info.get("imageLinks").get("large") if volume_info.get("imageLinks").get("large") else volume_info.get("imageLinks").get("smallThumbnail")
                book_to_save["language"] = volume_info["language"]
                book_to_save["preview_link"] = volume_info["previewLink"]

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
    permission_classes = (IsAuthenticated, )

    def dictfetchall(self, cursor):
        """
        Return all rows from a cursor as a dict
        :param cursor: django.db.connection.cursor
        :return: dict
        """
        columns = [col[0] for col in cursor.description]
        return [
            dict(zip(columns, row))
            for row in cursor.fetchall()
        ]

    def get(self, request, user_id):
        """
        For a specific user return all books after grouping them based on the shelf type
        :param request: request object
        :param user_id: int, id of an user
        :return: dict, all books of an user
        """
        cursor = connection.cursor()
        qry = f'SELECT * FROM book b JOIN book_shelf bs on b.id=bs.book_id WHERE bs.user_id={user_id}'
        cursor.execute(qry)
        books = self.dictfetchall(cursor)
        RL = []
        WL = []
        SL = []
        for book in books:
            if book.get("book_in_shelf") == "RL":
                RL.append(book)
            elif book.get("book_in_shelf") == "WL":
                WL.append(book)
            else:
                SL.append(book)
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
        reviews = Review.objects.select_related().filter(book=book_id)
        if not reviews:
            return Response({"msg": "Book not found"}, status=status.HTTP_404_NOT_FOUND)
        bid = None
        book_title = None
        book_reviews = []
        for review in reviews:
            bid = review.book.id
            book_title = review.book.title
            rvw = {
                "user_id": review.user.id,
                "user_name": review.user.first_name,
                "rating": review.rating,
                "comment": review.comment
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
    permission_classes = (IsAuthenticated, )

    def get(self, request, user_id):
        """
        Returns all the ratings and comments done by a specific user
        :param request: request object
        :param user_id: int, id of an user
        :return: dict, user_id and all reviews
        """
        reviews = Review.objects.select_related().filter(user=user_id)
        if not reviews:
            return Response({"msg": "No reviews found"}, status=status.HTTP_404_NOT_FOUND)
        users_review = []
        for review in reviews:
            rvw = {
                "book_id": review.book.id,
                "book_title": review.book.title,
                "rating": review.rating,
                "comment": review.comment
            }
            users_review.append(rvw)
        send_review = {"user_id": user_id, "reviews": users_review}
        return Response(send_review, status=status.HTTP_200_OK)


class TopTenBooksAPIView(APIView):
    """
    Fetch Top 10 Books based on number of appearances in multiple user's shelf
    """

    def dictfetchall(self, cursor):
        """
        Return all rows from a cursor as a dict
        :param cursor: django.db.connection.cursor
        :return: dict
        """
        columns = [col[0] for col in cursor.description]
        return [
            dict(zip(columns, row))
            for row in cursor.fetchall()
        ]

    def get(self, request):
        cursor = connection.cursor()
        qry = "SELECT " \
              "book_id, title, author, description, image_link_small, COUNT(book_id) 'book_count' " \
              "FROM book_shelf JOIN book ON book_shelf.book_id = book.id " \
              "GROUP BY book_id ORDER BY book_count DESC LIMIT 10"
        cursor.execute(qry)
        books = self.dictfetchall(cursor)
        return Response(books, status=status.HTTP_200_OK)