from rest_framework import serializers
from authentication.models import User

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'name', 'profile_picture', 'description')