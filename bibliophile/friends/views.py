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
            # users = User.objects.get(id = user.id)
            user_friends = user.friends.all().values()
            serializer = ProfileSerializer(user_friends, many = True)
            print(serializer.data)
            return Response({"friends" : serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"msg":"Invalid User"}, status=status.HTTP_404_NOT_FOUND)

class SendFriendRequest(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request, userId):
        try:
            sender = request.user
            receiver = User.objects.get(id=userId)
            print("receiver:",receiver.id, "sender:", sender.id)

            if receiver.id == sender.id:
                return Response({"msg":"can't send request to own account"}, status = status.HTTP_400_BAD_REQUEST)
            friend_request, created = FriendRequest.objects.get_or_create(sender= sender, receiver=receiver)
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
            if friend_request.receiver == request.user:
                if friend_request.is_active:
                    friend_request.receiver.friends.add(friend_request.sender)
                    friend_request.sender.friends.add(friend_request.receiver)
                    friend_request.is_active = False
                    friend_request.save()
                    return Response({"msg":"friend request accepted"}, status=status.HTTP_200_OK)
                else:
                    return Response({"msg":"friend request already accepted"}, status=status.HTTP_200_OK)
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
            if friend_request.receiver == request.user:
                if friend_request.is_active:
                    friend_request.is_active = False
                    friend_request.save()
                    return Response({"msg":"friend request rejected"}, status=status.HTTP_200_OK)
                else:
                    return Response({"msg":"inactive request "}, status=status.HTTP_200_OK)
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
            if friend_request.sender == request.user:
                if friend_request.is_active:
                    friend_request.is_active = False
                    friend_request.save()
                    return Response({"msg":"friend request cancelled"}, status=status.HTTP_200_OK)
                else:
                    return Response({"msg":"inactive request"}, status=status.HTTP_200_OK)
            else:
                return Response({"msg":"unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            print(e)
            return Response({"msg":"invalid requestId"}, status=status.HTTP_404_NOT_FOUND)

class UnFriend(APIView):
    permissions_classes = (IsAuthenticated, )
    def get(self, request, removeeId):
        try:
            removee = User.objects.get(id = removeeId)
            request.user.friends.remove(removee)
            removee.friends.remove(request.user)
            return Response({"msg": "The requested user is unfriended"}, status = status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"msg": "Invalid User"}, status = status.HTTP_404_NOT_FOUND)

class GetAllFriendRequests(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request):
        friend_requests = FriendRequest.objects.filter(receiver = request.user).values()  
        data = []
        for request in friend_requests:
            print(request)
            if request['is_active']:
                sender = User.objects.get(id = request["sender_id"])
                print(sender)
                serializer = ProfileSerializer(sender)
                temp = serializer.data
                temp['request_id'] = request['id']
                print(temp)
                data.append(temp)
        return Response({"pending_requests": data}, status=status.HTTP_200_OK)