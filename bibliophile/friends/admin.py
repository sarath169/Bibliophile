from django.contrib import admin
from .models import FriendRequest

class CustomFriendRequest(admin.ModelAdmin):
    list_display = (
        'id', 'sender', 'receiver', 'is_active'
    )
    list_display_links = ('id', )


admin.site.register(FriendRequest, CustomFriendRequest)
