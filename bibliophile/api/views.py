from django.http import HttpResponse
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework import status

from authentication.models import User
from .serializers import ProfileSerializer


def index(request):
    return HttpResponse("Hello, world. You're at the API's index.")

class ProfileView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer
    def get_queryset(self):
        print(self.request.user)
        user = User.objects.get(email = self.request.user)
        return user