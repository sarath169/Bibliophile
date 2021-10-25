from django.urls import path, include
from . import views
urlpatterns = [
    path('book/', include('books.urls')),
    path('', views.index, name = 'index' ),
    path('profile/', views.ProfileView.as_view(), name= "profile" )
]
