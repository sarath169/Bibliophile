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
        try:
            to_user = User.objects.get(id=userId)
            print(to_user.id, "to_user", request.user.id, "from user")
            if to_user.id == request.user.id:
                return Response({"msg":"can't send request to own account"})
            friend_request, created = FriendRequest.objects.get_or_create(from_user=from_user, to_user=to_user)
            if created:
                return Response({"msg":"friend request sent"}, status=status.HTTP_200_OK)
            else:
                return Response({"msg":"friend request was already sent"}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"msg":"user not found"}, status=status.HTTP_404_NOT_FOUND)

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

class RejectFriendRequest(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request, requestId):
        friend_request = FriendRequest.objects.get(id=requestId)
        if friend_request.to_user == request.user:
            friend_request.delete()
            return Response({"msg":"friend request rejected"}, status=status.HTTP_200_OK)
        else:
            return Response({"msg":"action pending"}, status=status.HTTP_200_OK)

class GetAllFriendRequests(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request):
        friend_request = FriendRequest.objects.filter(to_user = request.user).values()  
        print(friend_request)
        return Response({"friend_requests": friend_request}, status=status.HTTP_200_OK)