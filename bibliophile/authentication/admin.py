from django.contrib import admin
from .models import User, OtpValidation


class CustomUserAdmin(admin.ModelAdmin):
    """Custom display of User in Django Admin"""
    exclude = ('groups', 'user_permissions', )
    list_display = (
        'id', 'name', 'email', 'validated',
    )
    list_display_links = ('name', )
    list_editable = ('validated', )
    search_fields = ('name', 'email', )
    fieldsets = (
        ('Login Credentials', {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('name', 'public_url' )}),
        ('Permissions', {'fields': ('is_active', 'is_superuser', 'validated')}),
        ('Profile Picture', {'fields': ('profile_picture', )})
    )
    ordering = ('name', )
    list_filter = ()


class CustomOTPAdmin(admin.ModelAdmin):
    list_display = (
        'user', 'otp'
    )

admin.site.register(User, CustomUserAdmin)
admin.site.register(OtpValidation, CustomOTPAdmin)
