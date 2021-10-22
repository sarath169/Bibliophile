import random
import threading

from django.contrib.auth import authenticate
from django.core.mail import EmailMessage
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework import status

from .models import OtpValidation, User as CustomUser
from .serializers import RegisterSerializer, PasswordChangeSerializer
from django.conf import settings

class EmailThread(threading.Thread):

    def __init__(self, email):
        self.email=email
        threading.Thread.__init__(self)

    def run(self):
        self.email.send()

# Create your views here.
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
        print(email, password)
        try:
            user = authenticate(email = email, password = password)
            print(user)
            token = Token.objects.get_or_create(user = user)
            print(token[0])
            return Response({'token' : str(token[0]), 'id': user.id}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'error': "password does not match"}, status = status.HTTP_400_BAD_REQUEST)
    
                

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
            subject = 'Bibliophile App  : Verify Account'
            # message = render_to_string('OTP to verify ', otp)
            email_from = settings.EMAIL_HOST_USER
            print(email_from)
            to=user.email
            print(to)
            try:
                    userotp_obj = OtpValidation.objects.get(user = user.id)
                    print(userotp_obj.otp)
                    print("tried")
            except:
                    userotp_obj = None
                    print("except")
            if userotp_obj:
                email= EmailMessage(
                        subject,        
                        userotp_obj.otp,
                        email_from,
                        [to],
                )
            else:
                email= EmailMessage(
                                subject,        
                                str(otp),
                                email_from,
                                [to],
                        )
                userotp_obj = OtpValidation(user_id = user.id, otp = otp)
                userotp_obj.save()
            EmailThread(email).run()
            message = {"message" : "success" }
            return Response(message, status=status.HTTP_200_OK)

        if user.validated :
            subject = 'Bibliophile App  : Password Change Request'
            # message = render_to_string('OTP to verify ', otp)
            email_from = settings.EMAIL_HOST_USER
            print(email_from)
            to=user.email
            print(to)
            try:
                    userotp_obj = OtpValidation.objects.get(user = user.id)
            except:
                    userotp_obj = None
            if userotp_obj:
                email= EmailMessage(
                        subject,        
                        userotp_obj.otp,
                        email_from,
                        [to],
                )
            else:
                email= EmailMessage(
                                subject,        
                                str(otp),
                                email_from,
                                [to],
                        )
                userotp_obj = OtpValidation(user_id = user.id, otp = otp)
                userotp_obj.save()
            EmailThread(email).run()
            message = {"message" : "success" }
            return Response(message, status=status.HTTP_200_OK)
        
        else:
            response = {"message" : "user with email not found" }
            return Response(response, status=status.HTTP_404_NOT_FOUND)
        

class VerifyOtpView(APIView):
    def post(self, request):
        try:
            email = request.data['email']
            otp = request.data['otp']
            user = CustomUser.objects.get(email = email)
            userotp_obj = OtpValidation.objects.get(user = user.id)
            print(userotp_obj.otp)
            print(otp)
            if userotp_obj.otp == otp:
                k =OtpValidation.objects.filter(user = user.id).delete()
                print(k)
                return Response({"response" : "Validation success"}, status=status.HTTP_200_OK)
            else:
                return Response({"error" : "otp did not match"}, status=status.HTTP_401_UNAUTHORIZED)

        except Exception as e:
            print(e)
            message = {"message": "check formdata"}
            return Response({"response" : "Password change Success"}, status = status.HTTP_400_BAD_REQUEST)
