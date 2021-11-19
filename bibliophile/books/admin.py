from django.contrib import admin

from books.models import Book, BookShelf, Review


class CustomBook(admin.ModelAdmin):
    list_display = (
        'id', 'title', 'author'
    )
    list_display_links = ('id', 'title')


class CustomBookShelf(admin.ModelAdmin):
    list_display = (
        'book', 'user', 'book_in_shelf'
    )


class CustomReview(admin.ModelAdmin):
    list_display = (
        'book', 'user', 'rating', 'comment'
    )


admin.site.register(Book, CustomBook)
admin.site.register(BookShelf, CustomBookShelf)
admin.site.register(Review, CustomReview)

