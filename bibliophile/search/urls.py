from django.urls import path
from search.views import SearchBook, GetBookDetails


urlpatterns = [
    path('<str:search_key>/', SearchBook.as_view(), name="search_books"),
    path('get/<str:book_id>/', GetBookDetails.as_view(), name="search_book_details"),
]