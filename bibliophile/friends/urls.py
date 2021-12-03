from django.urls import path
from .views import SendFriendRequest, AcceptFriendRequest, RejectFriendRequest, GetAllFriendRequests, GetAllFriends, UnFriend

urlpatterns = [
   path('sendfriendrequest/<int:receiverId>/', SendFriendRequest.as_view(), name="send_friend_request"),
   path('acceptfriendrequest/<int:requestId>/', AcceptFriendRequest.as_view(), name="accept_friend_request"),
   path('rejectfriendrequest/<int:requestId>/', RejectFriendRequest.as_view(), name = "reject_friend_request"),
   path('getallfriendrequests/', GetAllFriendRequests.as_view(), name='get_all_friend_requests'),
   path('getfriends/', GetAllFriends.as_view(), name='get_user_friends'),  
   path('unfriend/<int:removeeId>/', UnFriend.as_view(), name='unfriend'),
]