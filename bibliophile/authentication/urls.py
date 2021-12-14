from django.urls import path

from .views import LoginView, RegistrationView, LogoutView, SendMailView, ForgotPasswordView, VerifyOtpView, \
    ProfileAPIView, PublicProfileAPIView, PasswordChangeAPIView, VerifyEmailView, GetAllUsersAPIView, \
    GetUserSearchAPIView, VerifyUserTokenAPIView

urlpatterns = [
    path('signup/', RegistrationView.as_view(), name = 'signup'),
    path('sendotp/', SendMailView.as_view(), name = "send_otp"),
    path('login/', LoginView.as_view(), name = 'login' ),
    path('logout/', LogoutView.as_view(), name= "logout"),
    path('verifyemail/', VerifyEmailView.as_view(), name = "verify_email"),
    path('verifytoken/', VerifyUserTokenAPIView.as_view(), name="verify_user_token"),
    path('forgotpassword/', ForgotPasswordView.as_view(), name= "forgot_password"),
    path('verifyotp/', VerifyOtpView.as_view(), name = "verifyotp"),
    path('profile/', ProfileAPIView.as_view(), name="profile"),
    path('profile/updatepassword/', PasswordChangeAPIView.as_view(), name="change_password"),
    path('public/profile/<str:user_id>/', PublicProfileAPIView.as_view(), name="public_profile"),
    path('getallusers/', GetAllUsersAPIView.as_view(), name= 'get_all_users' ),
    path('getuserresults/<str:searchKey>/', GetUserSearchAPIView.as_view(), name = 'get_user_search' ),
]
