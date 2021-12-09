from django.contrib import admin
from .models import FriendRequest
# Register your models here.

class CustomFriendRequest(admin.ModelAdmin):
    list_display = (
        'sender', 'receiver', 'is_active', 'created_at'
    )
admin.site.register(FriendRequest, CustomFriendRequest)