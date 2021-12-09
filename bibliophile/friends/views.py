from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import serializers, status
from rest_framework.permissions import IsAuthenticated

from authentication.models import User
from .models import FriendRequest
from .serializers import FriendRequestSerializer
from authentication.serializers import UpdateProfileSerializer


class GetAllFriends(APIView):
    permissions_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        try:
            # users = User.objects.get(id = user.id)
            user_friends = user.friends.all()
            # print(user_friends)
            serializer = UpdateProfileSerializer(user_friends, many=True, context={"request": request})

#             print(serializer.data)
            return Response({"friends": serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"msg": "Invalid User"}, status=status.HTTP_404_NOT_FOUND)


class SendFriendRequest(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, receiverId):
        try:
            sender = request.user
            sender_friends_list = sender.friends.all()
            receiver = User.objects.get(id=receiverId)
            if receiver in sender_friends_list:
                return Response({"msg": "already friends"}, status=status.HTTP_200_OK)
            else:
#                 print("receiver:", receiver.id, "sender:", sender.id)
                if receiver.id == sender.id:
                    return Response({"msg": "can't send request to own account"}, status=status.HTTP_400_BAD_REQUEST)
                friend_requests = FriendRequest.objects.filter(sender=sender, receiver=receiver).order_by('-created_at')
                if friend_requests:
                    is_friend_request_active = friend_requests[0].is_active
                    if is_friend_request_active:
                        serializer = FriendRequestSerializer(friend_requests[0])
                        return Response({"request": serializer.data,"msg": "friend request was already sent"}, status=status.HTTP_200_OK)
                    else:
                        request = FriendRequest.objects.create(sender = sender, receiver = receiver)
                        serializer = FriendRequestSerializer(request)
                        return Response({"request": serializer.data, "msg":"friend request sent"}, status=status.HTTP_200_OK)
                else:
                    request = FriendRequest.objects.create(sender = sender, receiver = receiver)
                    serializer = FriendRequestSerializer(request)
                    return Response({"request": serializer.data, "msg":"friend request sent"}, status=status.HTTP_200_OK)
                    
        except Exception as e:
            print(e)
            return Response({"msg": "user not found"}, status=status.HTTP_404_NOT_FOUND)


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
                    return Response({"msg": "friend request accepted"}, status=status.HTTP_200_OK)
                else:
                    return Response({"msg": "request status inactive"}, status=status.HTTP_200_OK)
            else:
                return Response({"msg": "UnAuthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            print(e)
            return Response({"msg": "invalid requestId"}, status=status.HTTP_404_NOT_FOUND)


class RejectFriendRequest(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, requestId):
        try:
            friend_request = FriendRequest.objects.get(id=requestId)
            if friend_request.receiver == request.user:
                if friend_request.is_active:
                    friend_request.is_active = False
                    friend_request.save()
                    return Response({"msg": "friend request rejected"}, status=status.HTTP_200_OK)
                else:
                    return Response({"msg": "inactive request "}, status=status.HTTP_200_OK)
            else:
                return Response({"msg": "UnAuthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            print(e)
            return Response({"msg": "invalid requestId"}, status=status.HTTP_404_NOT_FOUND)


class CancelFriendRequest(APIView):
    permission_classes = (IsAuthenticated, )
    print("cancel friend request")

    def get(self, request, requestId):
        try:
#             print("Request ID: ", requestId)
            friend_request = FriendRequest.objects.get(id=requestId)
            if friend_request.sender == request.user:
                if friend_request.is_active:
                    friend_request.delete()
                    return Response({"msg": "friend request cancelled"}, status=status.HTTP_200_OK)
                else:
                    return Response({"msg": "inactive request"}, status=status.HTTP_200_OK)
            else:
                return Response({"msg": "unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            print(e)
            return Response({"msg": "invalid requestId"}, status=status.HTTP_404_NOT_FOUND)


class UnFriend(APIView):
    permissions_classes = (IsAuthenticated, )

    def get(self, request, removeeId):
        user = request.user
        try:
            user_friends_list = user.friends.all()
            removee = User.objects.get(id=removeeId)
            if removee in user_friends_list:
                user.friends.remove(removee)
                removee.friends.remove(request.user)
                return Response({"msg": "The requested user is unfriended"}, status=status.HTTP_200_OK)
            else:
                return Response({"msg": "The requested user not a friend"}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"msg": "Invalid User"}, status=status.HTTP_404_NOT_FOUND)


class GetAllFriendRequests(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):

        friend_requests = FriendRequest.objects.filter(receiver=request.user, is_active=True).values()
        data = []
        for request in friend_requests:
            sender = User.objects.get(id=request["sender_id"])
            serializer = UpdateProfileSerializer(sender)
            temp = serializer.data
            temp['request_id'] = request['id']
            data.append(temp)
        return Response({"pending_requests": data}, status=status.HTTP_200_OK)


class GetAllRequestedUsers(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        friend_requests = FriendRequest.objects.filter(sender=request.user, is_active=True).values()
        print(friend_requests)
        data = []
        for request in friend_requests:
            receiver = User.objects.get(id=request["receiver_id"])
            serializer = UpdateProfileSerializer(receiver)
            temp = serializer.data
            temp['request_id'] = request['id']
            data.append(temp)
        return Response({"requested_users": data}, status=status.HTTP_200_OK)