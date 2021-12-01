from rest_framework import serializers

from authentication.models import User

class FriendRequestSerializer(serializers.HyperlinkedModelSerializer):
    profile_picture = serializers.ImageField(max_length=None, allow_empty_file=False, allow_null=True, required=False)
    request_id = serializers.IntegerField(required = True)

    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'description', 'profile_picture', 'public_url', 'request_id')