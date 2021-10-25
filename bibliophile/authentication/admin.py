from django.contrib import admin
from .models import User, OtpValidation

admin.site.register(User)
admin.site.register(OtpValidation)