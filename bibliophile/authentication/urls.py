from django.urls import path
from .views import LoginView, RegistrationView, LogoutView,SendMailView, ForgotPasswordView, VerifyOtpView
urlpatterns = [
    path('signup/', RegistrationView.as_view(), name = 'signup'),
    path('sendotp/', SendMailView.as_view(), name = "send_otp"),
    path('login/', LoginView.as_view() , name = 'login' ),
    path('logout/', LogoutView.as_view(), name= "logout"),
    path('forgotpassword/', ForgotPasswordView.as_view(), name= "forgot_password"),
    path('verifyotp/', VerifyOtpView.as_view(), name = "verifyotp"),
]
