from django.urls import path, include
from .views import index
urlpatterns = [
    path('book/', include('books.urls')),
    path('', index, name = 'index' ),
]
