import os
import logging
import random
import dotenv

from django.contrib.auth import authenticate
from django.db.models import Q
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework import serializers, status
from rest_framework.permissions import IsAuthenticated
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from .models import OtpValidation, User as CustomUser
from .serializers import RegisterSerializer, VerifyOtpSerializer, ProfileSerializer, UpdateProfileSerializer
from django.conf import settings
from .task import send_mail_func

dotenv.load_dotenv()

class RegistrationView(CreateAPIView):
    # This view is to register new users
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        try:
            serializer = RegisterSerializer(data=request.data)
            data = {}
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_200_OK)
        except:
            message = {"message": "Please provide all necessary values"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    # permission_classes = [AllowAny]
    def post(self, request):
        print(request.data)
        email = request.data['email']
        password = request.data['password']
        try:
            user = CustomUser.objects.get(email = email)
        except CustomUser.DoesNotExist:
            return Response({"msg": "Invalid Email"}, status=status.HTTP_404_NOT_FOUND)
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
                return Response({'msg': "Invalid Password"}, status = status.HTTP_400_BAD_REQUEST)
        else:
            mail_subject = 'Bibliophile App  : Verify Account'
            to_email = user.email
            name = user.name
            content = "Thank you for choosing Bibliophile. Use the following OTP to complete your Sign Up procedures."
            try:
                userotp_obj = OtpValidation.objects.get(user=user.id)
                print(userotp_obj.otp)
                print("tried")
            except:
                userotp_obj = None
                print("except")
            if userotp_obj:
                send_mail_func.delay( mail_subject, content, userotp_obj.otp, os.getenv('EMAIL_HOST_USER') ,to_email, name)
            return Response({'msg': "Please Complete Verification"}, status = status.HTTP_403_FORBIDDEN)


class LogoutView(APIView):
    # This view is to logout user
    permission_classes = (IsAuthenticated, )
    def post(self, request):
        try:
            # simply delete the token to force a login
            token = request.auth.key
            Token.objects.filter(key=token).delete()
            data = {"message": "logout success"}
            return Response(data, status=status.HTTP_200_OK)
        except:
            message = {"message": "Token not found"}
            return Response(message, status=status.HTTP_404_NOT_FOUND)


class ForgotPasswordView(APIView):

    def post(self, request):
        print(request.data['email'], request.data['password'], request.data['password2'])
        try:
            # simply delete the token to force a login
            email = request.data['email']
            password = request.data['password']
            password2 = request.data['password2']
            user = CustomUser.objects.get(email=email)

            if password == password2:
                user.set_password(password)
                user.save()
                return Response({"response": "Password change Success"}, status=status.HTTP_200_OK)
            else:
                return Response({"response": "Passwords do not match"}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            message = {"message": "user not found"}
            return Response(message, status=status.HTTP_404_NOT_FOUND)


class SendMailView(APIView):

    def post(self, request):
        otp = random.randrange(99999, 999999)
        email = request.data.get('email')
        if not email:
            return Response({"msg": "email is required"}, status=status.HTTP_400_BAD_REQUEST)

        user = CustomUser.objects.get(email=email)
        print(user.validated)

        if not user.validated:
            mail_subject = 'Bibliophile App  : Verify Account'
            to_email = user.email
            name = user.name
            content = "Thank you for choosing Bibliophile. Use the following OTP to complete your Sign Up procedures."
            try:
                userotp_obj = OtpValidation.objects.get(user=user.id)
                print(userotp_obj.otp)
                print("tried")
            except:
                userotp_obj = None
                print("except")
            if userotp_obj:
                send_mail_func.delay( mail_subject, content, userotp_obj.otp, os.getenv('EMAIL_HOST_USER') ,to_email, name)

            else:
                send_mail_func.delay( mail_subject, content, otp, os.getenv('EMAIL_HOST_USER') ,to_email, name)
                userotp_obj = OtpValidation(user_id=user.id, otp=otp)
                userotp_obj.save()
            message = {"message": "success"}
            return Response(message, status=status.HTTP_200_OK)

        if user.validated:
            
            mail_subject = 'Bibliophile App  : Password Change Request'
            # message = render_to_string('OTP to verify ', otp)
            content = 'Forgot your password?. Use the following OTP to change the password.'
            to_email = user.email
            name = user.name
            try:
                userotp_obj = OtpValidation.objects.get(user=user.id)
                print(userotp_obj.otp)
                print("tried")
            except:
                userotp_obj = None
                print("except")
            if userotp_obj:
                send_mail_func.delay(mail_subject, content, userotp_obj.otp, os.getenv('EMAIL_HOST_USER') ,to_email, name)
            else:
                send_mail_func.delay(mail_subject, content, otp, os.getenv('EMAIL_HOST_USER') ,to_email, name)
                userotp_obj = OtpValidation(user_id=user.id, otp=otp)
                userotp_obj.save()
            message = {"message": "success"}
            return Response(message, status=status.HTTP_200_OK)

        else:
            response = {"message": "user with email not found"}
            return Response(response, status=status.HTTP_404_NOT_FOUND)


class VerifyOtpView(APIView):
    serializer_class = VerifyOtpSerializer

    def post(self, request):

        email = request.data.get('email')
        otp = request.data.get('otp')
        if not email or not otp:
            return Response({"msg": "email and OTP are required"}, status=status.HTTP_400_BAD_REQUEST)
        user = CustomUser.objects.get(email = email)
        if user.validated:
            try:
                userotp_obj = OtpValidation.objects.get(user = user.id)
                print(userotp_obj.otp)
                print(otp)
                if userotp_obj.otp == otp:
                    OtpValidation.objects.filter(user = user.id).delete()
                    return Response({"msg" : "validation success"}, status=status.HTTP_200_OK)
                else:
                    return Response({"msg" : "otp did not match"}, status=status.HTTP_406_NOT_ACCEPTABLE)

            except Exception as e:
                print(e)
                return Response({"msg" : "Please check email"}, status = status.HTTP_400_BAD_REQUEST)
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
                    return Response({"msg" : "validation success"}, status=status.HTTP_200_OK)
                else:
                    return Response({"msg" : "otp did not match"}, status=status.HTTP_406_NOT_ACCEPTABLE)

            except Exception as e:
                print(e)
                return Response({"msg" : "please check email"}, status = status.HTTP_400_BAD_REQUEST)


class ProfileAPIView(APIView):
    permission_classes = (IsAuthenticated, )

    def get_user(self, token):
        """
        Return user_id based on token
        :param token: Authentication token of a user
        :return: user_id
        """
        try:
            user_id = Token.objects.get(key=token).user_id
            return user_id
        except CustomUser.DoesNotExist:
            return None

    def get(self, request):
        """
        Returns profile details of a user
        """
        token = request.auth.key
        user_id = self.get_user(token)

        if user_id:
            user = CustomUser.objects.get(id=user_id)
            serializer = ProfileSerializer(user, context={"request": request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"msg": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request):
        """
        Update user's name, description, password and profile picture
        """
        token = request.auth.key
        user_id = self.get_user(token)

        if user_id:
            user = CustomUser.objects.get(id=user_id)
            serializer = UpdateProfileSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"msg": "User not found"}, status=status.HTTP_404_NOT_FOUND)


class PublicProfileAPIView(APIView):
    def get(self, request, user_id):
        """
        Returns profile details of a user
        """

        if user_id:
            user = CustomUser.objects.get(public_url=user_id)
            serializer = ProfileSerializer(user, context={"request": request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"msg": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class PasswordChangeAPIView(APIView):

    def get_user(self, token):
        """
        Return user_id based on token
        :param token: Authentication token of a user
        :return: user_id
        """
        try:
            user_id = Token.objects.get(key=token).user_id
            return user_id
        except CustomUser.DoesNotExist:
            return None

    permission_classes = (IsAuthenticated, )

    def put(self, request):
        token = request.auth.key
        user_id = self.get_user(token)

        if user_id:
            try:
                user = CustomUser.objects.get(id=user_id)
                user.set_password(request.data.get("password"))
                user.save()
                return Response({"msg": "Password Updated"}, status=status.HTTP_200_OK)
            except Exception as ex:
                logging.Logger(ex)
                return Response({"mag": "Something went wrong"}, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({"msg": "User not found"}, status=status.HTTP_404_NOT_FOUND)
