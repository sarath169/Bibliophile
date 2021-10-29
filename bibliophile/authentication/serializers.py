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
        user = CustomUser(
            email = self.validated_data['email'],
            name = self.validated_data['name'],
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