from django.contrib import admin
from .models import CustomUser, OtpValidation
# Register your models here.

admin.site.register(CustomUser)
admin.site.register(OtpValidation)