from django.urls import path
from books.views import GetBookAPIView, AddBookAPIView, GetUsersBookAPIView, \
    AddReviewAPIView, BooksReviewAPIView, UsersReviewAPIView, TopTenPopularBooksAPIView, \
    TopTenRatedBooksAPIView, LastTenReviewsAPIView, AddBookSeoidView, GetBookSeoid, GetBookid

urlpatterns = [
    path('', GetBookAPIView.as_view(), name="get_all_books"),
    path('get/<str:book_id>/', GetBookAPIView.as_view(), name="get_one_books"),
    path('add/', AddBookAPIView.as_view(), name="add_book"),
    path('get_users_book/<int:user_id>/', GetUsersBookAPIView.as_view(), name="get_users_book"),
    path('top_ten_popular/', TopTenPopularBooksAPIView.as_view(), name="top_ten_popular_book"),
    path('top_ten_rated/', TopTenRatedBooksAPIView.as_view(), name="top_ten_rated_book"),
    path('review/', AddReviewAPIView.as_view(), name="add_review"),
    path('review/last_ten/', LastTenReviewsAPIView.as_view(), name="last_ten_review"),
    path('review/book/<str:book_id>/', BooksReviewAPIView.as_view(), name="add_review"),
    path('review/user/<int:user_id>/', UsersReviewAPIView.as_view(), name="add_review"),
    path('seoid/', AddBookSeoidView.as_view(), name = "add_book_seoid"),
    path('getseoid/<str:book_id>/', GetBookSeoid.as_view(), name = "get_book_seoid"),
    path('getbookid/<str:seo_id>/', GetBookid.as_view(), name = "get_book_seoid"),

]
