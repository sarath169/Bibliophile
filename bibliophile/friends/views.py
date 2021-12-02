from django.db.models import expressions
from django.shortcuts import render
from rest_framework import permissions
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import serializers, status
from rest_framework.permissions import IsAuthenticated

from authentication.models import User
from .models import FriendRequest
from .serializers import FriendRequestSerializer
from authentication.serializers import ProfileSerializer

class GetAllFriends(APIView):
    permissions_classes = (IsAuthenticated,)
    def get(self, request):
        user = request.user
        try:
            users = User.objects.filter(id = user.id).values()
            print(users.friends)
            return Response({}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({}, status=status.HTTP_200_OK)

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
        try:
            friend_request = FriendRequest.objects.get(id=requestId)
            if friend_request.to_user == request.user:
                friend_request.to_user.friends.add(friend_request.from_user)
                friend_request.from_user.friends.add(friend_request.to_user)
                friend_request.delete()
                return Response({"msg":"friend request accepted"}, status=status.HTTP_200_OK)
            else:
                return Response({"msg":"friend request not accepted"}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"msg":"invalid requestId"}, status=status.HTTP_404_NOT_FOUND)

class RejectFriendRequest(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request, requestId):
        try:
            friend_request = FriendRequest.objects.get(id=requestId)
            if friend_request.to_user == request.user:
                friend_request.delete()
                return Response({"msg":"friend request rejected"}, status=status.HTTP_200_OK)
            else:
                return Response({"msg":"action pending"}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"msg":"invalid requestId"}, status=status.HTTP_404_NOT_FOUND)

class CancelFriendRequest(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request, requestId):
        try:
            friend_request = FriendRequest.objects.get(id=requestId)
            if friend_request.from_user == request.user:
                friend_request.delete()
                return Response({"msg":"friend request cancelled"}, status=status.HTTP_200_OK)
            else:
                return Response({"msg":"unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            print(e)
            return Response({"msg":"invalid requestId"}, status=status.HTTP_404_NOT_FOUND)


class GetAllFriendRequests(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request):
        friend_requests = FriendRequest.objects.filter(to_user = request.user).values()  
        data = []
        for request in friend_requests:
            from_user = User.objects.get(id = request["from_user_id"])
            print(from_user)
            serializer = ProfileSerializer(from_user)
            temp = serializer.data
            temp['request_id'] = request['id']
            print(temp)
            data.append(temp)
        return Response({"pending_requests": data}, status=status.HTTP_200_OK)