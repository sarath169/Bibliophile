from django.shortcuts import render
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from authentication.models import User
from .models import FriendRequest

class SendFriendRequest(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request, userId):
        from_user = request.user
        to_user = User.objects.get(id=userId)
        friend_request, created = FriendRequest.objects.get_or_create(from_user=from_user, to_user=to_user)
        if created:
            return Response({"msg":"friend request sent"}, status=status.HTTP_200_OK)
        else:
            return Response({"msg":"friend request was already sent"}, status=status.HTTP_200_OK)

class AcceptFriendRequest(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request, requestId):
        friend_request = FriendRequest.objects.get(id=requestId)
        if friend_request.to_user == request.user:
            friend_request.to_user.friends.add(friend_request.from_user)
            friend_request.from_user.friends.add(friend_request.to_user)
            friend_request.delete()
            return Response({"msg":"friend request accepted"}, status=status.HTTP_200_OK)
        else:
            return Response({"msg":"friend request not accepted"}, status=status.HTTP_200_OK)