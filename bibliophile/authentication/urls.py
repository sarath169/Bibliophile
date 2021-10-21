from django.urls import path
from .views import LoginView, RegistrationView, LogoutView, ForgotPasswordView, SendMailView
urlpatterns = [
    path('signup/', RegistrationView.as_view(), name = 'signup'),
    path('sendotp/', SendMailView.as_view(), name = "send_otp"),
    path('login/', LoginView.as_view() , name = 'login' ),
    path('logout/', LogoutView.as_view(), name= "logout"),
    path('forgotpassword/', ForgotPasswordView.as_view(), name= "forgot_password"),
]