import random

from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework import serializers, status

from .models import OtpValidation, User as CustomUser
from .serializers import RegisterSerializer, PasswordChangeSerializer, VerifyOtpSerializer
from django.conf import settings
from .task import send_mail_func

class RegistrationView(CreateAPIView):
    # This view is to register new users
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        try:
            serializer = RegisterSerializer(data = request.data)
            data = {}
            if serializer.is_valid():
                    serializer.save()
                    data['response'] = "Registration Success"
            else:
                    data = serializer.errors
            return Response(data)
        except:
            message = {"message" : "please provide all necessary values" }
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    # permission_classes = [AllowAny]
    def post(self, request):
        print(request.data)
        email = request.data['email']
        password = request.data['password']
        user = CustomUser.objects.get(email = email)
        print(email, password)
        if user.validated:
            try:
                user = authenticate(email = email, password = password)
                print(user)
                token = Token.objects.get_or_create(user = user)
                print(token[0])
                return Response({'token' : str(token[0]), 'id': user.id}, status=status.HTTP_200_OK)
            except Exception as e:
                print(e)
                return Response({'error': "password does not match"}, status = status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': "Please Complete Validation"}, status = status.HTTP_403_FORBIDDEN)
                

class LogoutView(APIView):
    # This view is to logout uers
    def post(self, request, format=None):
        print(request.data['user'])
        try:
            # simply delete the token to force a login
            email= request.data['user']
            print(email)
            user = CustomUser.objects.get(email = email)
            user.auth_token.delete()
            data = {"message":"logout success"}
            return Response(data, status=status.HTTP_200_OK)
        except:
            message = {"message" : "Token not found" }
            return Response(message, status=status.HTTP_404_NOT_FOUND)

class ForgotPasswordView(APIView):

    def post(self, request):
        print(request.data['email'], request.data['password'], request.data['password2'])
        try:
            # simply delete the token to force a login
            email = request.data['email']
            password = request.data['password']
            password2 = request.data['password2']
            user = CustomUser.objects.get(email = email)
            
            if password == password2:
                user.set_password(password)
                user.save()
                return Response({"response" : "Password change Success"}, status = status.HTTP_200_OK)
            else:
                return Response({"response" : "Passwords do not match"}, status = status.HTTP_200_OK)
        except Exception as e:
            print(e)
            message = {"message" : "user not found" }
            return Response(message, status=status.HTTP_404_NOT_FOUND)
        

class SendMailView(APIView):

    def post(self, request):
        otp = random.randrange(99999, 999999)
        email = request.data['email']
        user = CustomUser.objects.get(email = email)
        print(user.validated)

        if not user.validated :
            mail_subject = 'Bibliophile App  : Verify Account'
            # message = render_to_string('OTP to verify ', otp)
            to_email = user.email
            try:
                    userotp_obj = OtpValidation.objects.get(user = user.id)
                    print(userotp_obj.otp)
                    print("tried")
            except:
                    userotp_obj = None
                    print("except")
            if userotp_obj:
                send_mail_func.delay(mail_subject, userotp_obj.otp, to_email )
                
            else:
                send_mail_func.delay(mail_subject, str(otp), to_email )
                userotp_obj = OtpValidation(user_id = user.id, otp = otp)
                userotp_obj.save()
            message = {"message" : "success" }
            return Response(message, status=status.HTTP_200_OK)

        if user.validated :
            mail_subject = 'Bibliophile App  : Password Change Request'
            # message = render_to_string('OTP to verify ', otp)
            to_email = user.email
            try:
                    userotp_obj = OtpValidation.objects.get(user = user.id)
                    print(userotp_obj.otp)
                    print("tried")
            except:
                    userotp_obj = None
                    print("except")
            if userotp_obj:
                send_mail_func.delay(mail_subject, userotp_obj.otp, to_email )
            else:
                send_mail_func.delay(mail_subject, str(otp), to_email )
                userotp_obj = OtpValidation(user_id = user.id, otp = otp)
                userotp_obj.save()
            message = {"message" : "success" }
            return Response(message, status=status.HTTP_200_OK)
        
        else:
            response = {"message" : "user with email not found" }
            return Response(response, status=status.HTTP_404_NOT_FOUND)
        

class VerifyOtpView(APIView):
    serializer_class = VerifyOtpSerializer

    def post(self, request):
        email = request.data['email']
        otp = request.data['otp']
        user = CustomUser.objects.get(email = email)
        if user.validated:
            try:
                userotp_obj = OtpValidation.objects.get(user = user.id)
                print(userotp_obj.otp)
                print(otp)
                if userotp_obj.otp == otp:
                    OtpValidation.objects.filter(user = user.id).delete()
                    return Response({"response" : "validation success"}, status=status.HTTP_200_OK)
                else:
                    return Response({"error" : "otp did not match"}, status=status.HTTP_406_NOT_ACCEPTABLE)

            except Exception as e:
                print(e)
                return Response({"response" : "Please check email"}, status = status.HTTP_400_BAD_REQUEST)
        else:
            try:
                print("not valiated")
                userotp_obj = OtpValidation.objects.get(user = user.id)
                print(userotp_obj.otp)
                print(otp)
                if userotp_obj.otp == otp:
                    OtpValidation.objects.filter(user = user.id).delete()
                    user.validated = True
                    user.save()
                    print(user.validated, "valiate")
                    return Response({"response" : "validation success"}, status=status.HTTP_200_OK)
                else:
                    return Response({"error" : "otp did not match"}, status=status.HTTP_406_NOT_ACCEPTABLE)

            except Exception as e:
                print(e)
                return Response({"response" : "please check email"}, status = status.HTTP_400_BAD_REQUEST)