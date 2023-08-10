from django.urls import path
from . import views

urlpatterns = [
    path('register',views.RegisterApi.as_view(),name='register'),
    path('login',views.LoginApi.as_view(),name='login'),
    path('logout',views.LogoutApi.as_view(),name='logout'),
    path('return',views.ReturnDataApi.as_view(),name='return'),
    path('check', views.CheckLoginApi.as_view(), name='check'),
    path('profile',views.ProfileApi.as_view(),name='profile'),
    path('getprofile/<str:pk>',views.GetUserProfileApi.as_view(),name='getprofile'),
    path('post_project',views.UploadProjectPostApi.as_view(),name='post_project'),
    path('post_idea',views.UploadIdeaPostApi.as_view(),name='post_idea'),
    path('userposts',views.GetUserPostApi.as_view(),name='userposts'),
    path('allposts',views.GetAllPostApi.as_view(),name='allposts'),
    path('like_post/<str:post_id>',views.LikePostApi.as_view(),name='like_post'),
    path('save_post/<str:post_id>',views.SavePostApi.as_view(),name='save_post'),
]
