from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    name = models.CharField(max_length=30, blank=True)
    profile_picture = models.ImageField(upload_to='images/', blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    validated = models.BooleanField(default = False)
    description = models.TextField(blank=True)
    public_url = models.CharField(unique=True, max_length=250, default="", blank=True)
    friends = models.ManyToManyField("User", blank=True)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.name

    def get_image_url(self, obj):
        return obj.image.url

    class Meta:
        db_table = "User"

class OtpValidation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    otp = models.CharField(max_length=10)

    def __str__(self):
        return self.user.name

    class Meta:
        db_table = "OtpValidation"