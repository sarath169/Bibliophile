from django.http import HttpResponse
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView
from rest_framework import serializers, status

from authentication.models import User
from .serializers import ProfileSerializer


def index(request):
    return HttpResponse("Hello, world. You're at the API's index.")

class ProfileView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer
    
    def get_queryset(self):
        user = self.request.user
        print(user, "user")
        result = User.objects.filter(email = user).values('email', 'name', 'profile_picture', 'description')
        print(result)
        return result

class UpdateProfileView(UpdateAPIView):
    permisson_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer
    lookup_field = 'email'
    def get_queryset(self):
        print(str(self.request.get_full_path).split('/'), "request")
        user = self.request.user
        print(user, "user")
        result = User.objects.filter(email = user).values('email', 'name', 'profile_picture', 'description')
        print(result)
        return result
