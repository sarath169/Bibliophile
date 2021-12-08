from rest_framework import serializers

from authentication.models import User
from .models import FriendRequest

class FriendRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = FriendRequest
        fields = ('id', 'sender', 'receiver', 'is_active')