from rest_framework import serializers

from books.models import Book, BookShelf, Review


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class BookShelfSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookShelf
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        review, created = Review.objects.update_or_create(
            user=validated_data.get('user', None),
            book=validated_data.get('book', None),
            defaults={'rating': validated_data.get('rating', None), 'comment': validated_data.get('comment', None)})
        return review

    class Meta:
        model = Review
        fields = "__all__"
