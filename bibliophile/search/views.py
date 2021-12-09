import os
import requests
import logging
import dotenv

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

dotenv.load_dotenv()
class SearchBook(APIView):
    """
    Search book from google books api
    """
    def getResults(self, search_key):
        """
        Retrive books from google books based on search key
        :param search_key: str, keywords to search books
        :return: list, list of books with details
        """
        url = os.getenv('GOOGLE_BOOK_SELF_LINK')
        api_key = os.getenv('GOOGLE_BOOK_API_KEY')
        url = f'{url}?q={search_key}&maxResults=40&key={api_key}'
        try:
            res = requests.get(url)
            books = res.json().get("items")
            return books
        except Exception as ex:
            logging.debug(str(ex))
            return None

    def get(self, request, search_key=""):
        """
        Retrive books from google books based on search key
        :param search_key: str, keywords to search books
        :return: list, list of books with details
        """
        url = os.getenv('GOOGLE_BOOK_SELF_LINK')
        api_key = os.getenv('GOOGLE_BOOK_API_KEY')
        url = f'{url}?q={search_key}&maxResults=40&key={api_key}'
        try:
            res = requests.get(url)
            books = res.json().get("items")
            return Response(books, status=status.HTTP_200_OK)
        except Exception as ex:
            logging.debug(str(ex))
            return Response(status=status.HTTP_400_BAD_REQUEST)


class GetBookDetails(APIView):
    """
    Get details of a specific book from google book api
    """
    def getDetails(self, book_id):
        """
        Retrieve details of a specific book from google book api based on google book id
        :param book_id: str, book id from google book api
        :return dict: details of a specific book
        """
        url = os.getenv('GOOGLE_BOOK_SELF_LINK')
        url = f'{url}/{book_id}'

        book = None
        try:
            res = requests.get(url)
            book = res.json()
        except Exception as ex:
            logging.debug(str(ex))

        if book:
            book_details = {}
            book_details["id"] = book["id"]
            book_details["title"] = book["volumeInfo"].get("title")
            volume_info = book["volumeInfo"]
            authors = volume_info.get("authors")
            author = ', '.join([str(a) for a in authors])
            book_details["author"] = author
            book_details["publisher"] = volume_info.get("publisher")
            book_details["description"] = volume_info.get("description") if volume_info.get("description") else ""
            book_details["page_count"] = volume_info.get("pageCount")
            book_details["category"] = volume_info["categories"][0] if volume_info.get("categories") else "Unknown"
            book_details["image_link_small"] = volume_info.get("imageLinks").get("smallThumbnail") if volume_info.get(
                "imageLinks") else ""
            book_details["image_link_large"] = volume_info.get("imageLinks").get("large") if volume_info.get(
                "imageLinks") and volume_info.get(
                "imageLinks").get("large") else book_details["image_link_small"]
            book_details["language"] = volume_info["language"]
            book_details["preview_link"] = volume_info["previewLink"]

            return book_details
        else:
            return None

    def get(self, request, book_id=""):
        """

        """
        book_details = self.getDetails(book_id)
        if book_details:
            return Response(book_details, status=status.HTTP_200_OK)
        else:
            return Response({"msg": "Book not found"}, status=status.HTTP_404_NOT_FOUND)
