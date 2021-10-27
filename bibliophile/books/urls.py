from django.urls import path
from books.views import GetBookAPIView, AddBookAPIView, GetUsersBookAPIView, \
    AddReviewAPIView, BooksReviewAPIView, UsersReviewAPIView, TopTenBooksAPIView

urlpatterns = [
    path('', GetBookAPIView.as_view(), name="get_all_books"),
    path('get/<str:book_id>/', GetBookAPIView.as_view(), name="get_one_books"),
    path('add/', AddBookAPIView.as_view(), name="add_book"),
    path('get_users_book/<int:user_id>/', GetUsersBookAPIView.as_view(), name="get_users_book"),
    path('top_ten/', TopTenBooksAPIView.as_view(), name="top_ten_book"),
    path('review/', AddReviewAPIView.as_view(), name="add_review"),
    path('review/<str:book_id>/', BooksReviewAPIView.as_view(), name="add_review"),
    path('review/user/<int:user_id>/', UsersReviewAPIView.as_view(), name="add_review"),

]
