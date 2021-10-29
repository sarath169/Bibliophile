from django.urls import path, include, re_path
from . import views
urlpatterns = [
    path('book/', include('books.urls')),
    path('', views.index, name = 'index' ),
    path('profile/', views.ProfileView.as_view(), name= "profile" ),
    path('edit/', views.UpdateProfileView.as_view(), name="update_profile"),

]
