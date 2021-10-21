from rest_framework import serializers

from .models import CustomUser, OtpValidation

class RegisterSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(write_only=True, required=True, style={'input_type': 'password',})

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password', 'password2',)
        extra_kwargs = {
            'password' : {'write_only' : True},
            'email' : {'required': True}
        }
    
    def save(self):
        user = CustomUser(
            email = self.validated_data['email'],
            username = self.validated_data['username'],
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': "Passwords must match."})
        user.set_password(password)
        user.save()
        return 
class PasswordChangeSerializer(serializers.ModelSerializer):
    newpassword = serializers.CharField(write_only=True, required=True, style={'input_type': 'password',})
    newpassword2 = serializers.CharField(write_only=True, required=True, style={'input_type': 'password',})

    class Meta:
        model = CustomUser
        fields = ('email', 'password', 'password2')
    
    def save(self):
        print("entered")
        email = self.validated_data['email']
        newpassword = self.validated_data['password']
        newpassword2 = self.validated_data['password2']
        user = CustomUser.objects.get(email = email)
        if user:
            if newpassword != newpassword2:
                raise serializers.ValidationError({'password': "Passwords must match."})
            user.set_password(newpassword)
            user.save()
        else:
            raise serializers.ValidationError({'error': "user not found"})
        return