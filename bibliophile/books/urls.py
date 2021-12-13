from django.urls import path
from books.views import GetBookAPIView, GetBooksByPageAPIView, AddBookAPIView, GetUsersBookAPIView, \
    AddReviewAPIView, BooksReviewAPIView, UsersReviewAPIView, TopTenPopularBooksAPIView, \
    TopTenRatedBooksAPIView, LastTenReviewsAPIView, BooksPagedReviewAPIView, UsersPagedReviewAPIView, \
    BookStatisticsAPIView, UserRecommendationAPIView, ReaderListAPIView

urlpatterns = [
    path('', GetBookAPIView.as_view(), name="get_all_books"),
    path('paged/', GetBooksByPageAPIView.as_view(), name="get_all_books"),
    path('get/<str:book_id>/', GetBookAPIView.as_view(), name="get_one_books"),
    path('add/', AddBookAPIView.as_view(), name="add_book"),
    path('get_users_book/<int:user_id>/', GetUsersBookAPIView.as_view(), name="get_users_book"),
    path('top_ten_popular/', TopTenPopularBooksAPIView.as_view(), name="top_ten_popular_book"),
    path('top_ten_rated/', TopTenRatedBooksAPIView.as_view(), name="top_ten_rated_book"),
    path('review/', AddReviewAPIView.as_view(), name="add_review"),
    path('review/last_ten/', LastTenReviewsAPIView.as_view(), name="last_ten_review"),
    path('review/book/<str:book_id>/', BooksReviewAPIView.as_view(), name="add_review"),
    path('review/paged/book/<str:book_id>/', BooksPagedReviewAPIView.as_view(), name="add_review"),
    path('review/user/<int:user_id>/', UsersReviewAPIView.as_view(), name="add_review"),
    path('review/paged/user/<int:user_id>/', UsersPagedReviewAPIView.as_view(), name="add_review"),
    path('statistics/<str:book_id>/', BookStatisticsAPIView.as_view(), name="book_statistics"),
    path('recommendation/', UserRecommendationAPIView.as_view(), name='book_recommendation'),
    path('readers/<str:book_id>/', ReaderListAPIView.as_view(), name="book_readers"),
]
