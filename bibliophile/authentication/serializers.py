import time
from rest_framework import serializers

from .models import User as CustomUser, OtpValidation

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True, required=True, style={'input_type': 'password', })

    class Meta:
        model = CustomUser
        fields = ('name', 'email', 'password', 'password2',)
        extra_kwargs = {
            'password' : {'write_only' : True, 'required' : True},
            'email' : {'required': True},
            'name' : {'required' : True}
        }

    def save(self):
        user_name = self.validated_data['name']
        user = CustomUser(
            email = self.validated_data['email'],
            name = self.validated_data['name'],
            public_url = f'{user_name.replace(" ",".")}.{str(int(time.time()))}'
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': "Passwords must match."})
        user.set_password(password)
        user.save()
        return 


class VerifyOtpSerializer(serializers.ModelSerializer):
    class Meta:
        model = OtpValidation
        fields = ('user', 'otp')


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    profile_picture = serializers.ImageField(max_length=None, allow_empty_file=False, allow_null=True, required=False)

    class Meta:
        model = CustomUser
        fields = ('id', 'name', 'email', 'description', 'profile_picture', 'public_url')


class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'name', 'description', 'profile_picture', 'public_url')
