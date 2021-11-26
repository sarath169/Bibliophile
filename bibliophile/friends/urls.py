from django.urls import path
from .views import SendFriendRequest, AcceptFriendRequest

urlpatterns = [
   path('sendfriendrequest/<int:userId>/', SendFriendRequest.as_view(), name="send_friend_request"),
   path('acceptfriendrequest/<int:requestId>/', AcceptFriendRequest.as_view(), name="accept_friend_request")
]