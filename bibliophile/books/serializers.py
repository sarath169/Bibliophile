from rest_framework import serializers

from books.models import Book, BookShelf
from authentication.models import User


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class BookShelfSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookShelf
        fields = '__all__'


class UsersBookSerializer(serializers.Serializer):

    id = serializers.CharField(max_length=100)
    title = serializers.CharField(max_length=250)
    author = serializers.CharField(max_length=250)
    publisher = serializers.CharField(max_length=250)
    description = serializers.CharField(max_length=5000)
    page_count = serializers.IntegerField()
    category = serializers.CharField(max_length=250)
    image_link_small = serializers.CharField(max_length=1000)
    image_link_large = serializers.CharField(max_length=1000)
    language = serializers.CharField(max_length=100)
    preview_link = serializers.CharField(max_length=1000)
    book = serializers.CharField(max_length=250)
    user = serializers.CharField(max_length=250)
    book_in_shelf = serializers.CharField(max_length=250)
