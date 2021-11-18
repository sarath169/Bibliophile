import random
from datetime import datetime
from enum import unique
from django.utils import timezone
from django.db import models

from authentication.models import User

class Book(models.Model):
    id = models.CharField(primary_key=True, max_length=100)
    title = models.CharField(max_length=250)
    author = models.CharField(max_length=250)
    publisher = models.CharField(max_length=250)
    description = models.TextField(blank=True)
    page_count = models.IntegerField()
    category = models.CharField(max_length=250)
    image_link_small = models.CharField(max_length=1000)
    image_link_large = models.CharField(max_length=1000)
    language = models.CharField(max_length=100)
    preview_link = models.CharField(max_length=1000)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'book'
        verbose_name = 'Book'
        verbose_name_plural = 'Books'


class BookShelf(models.Model):
    READLIST = 'RL'
    WISHLIST = 'WL'
    SELFLIST = 'SL'

    BOOK_IN_SELF_CHOICES = [
        (READLIST, 'Readlist'),
        (WISHLIST, 'Wishlist'),
        (SELFLIST, 'Selflist'),
    ]

    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book_in_shelf = models.CharField(
        max_length=2,
        choices=BOOK_IN_SELF_CHOICES,
        # default=READLIST,
    )

    def __str__(self):
        return f'{self.book_id} - {self.user_id} - {self.book_in_shelf}'

    class Meta:
        db_table = 'book_shelf'
        verbose_name = 'Book Shelf'
        verbose_name_plural = 'Book Shelf'
        unique_together = (('book_id', 'user_id'),)


class Review(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.book} - {self.user}'

    class Meta:
        db_table = 'review'
        verbose_name = 'Review'
        verbose_name_plural = 'Reviews'
        unique_together = (('book_id', 'user_id'),)
