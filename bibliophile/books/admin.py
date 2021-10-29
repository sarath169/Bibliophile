from django.contrib import admin

from books.models import Book, BookShelf, Review

admin.site.register(Book)
admin.site.register(BookShelf)
admin.site.register(Review)
