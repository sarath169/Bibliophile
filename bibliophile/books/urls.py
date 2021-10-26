from django.urls import path
from books.views import GetBookAPIView, AddBookAPIView, GetUsersBookAPIView
urlpatterns = [
    path('', GetBookAPIView.as_view(), name="get_all_books"),
    path('<str:book_id>/', GetBookAPIView.as_view(), name="get_one_books"),
    path('add/', AddBookAPIView.as_view(), name="add_book"),
    path('get_users_book/<str:user_id>/', GetUsersBookAPIView.as_view(), name="get_users_book"),
]
