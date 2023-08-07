from django.urls import path
from . import views

urlpatterns = [
    path('register',views.RegisterApi.as_view(),name='register'),
    path('login',views.LoginApi.as_view(),name='login'),
    path('logout',views.LogoutApi.as_view(),name='logout'),
    path('return',views.ReturnDataApi.as_view(),name='return'),
    path('check', views.CheckLoginApi.as_view(), name='check'),
]