from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User,auth
from .serializers import ProfileSerializer,LoginSerializer
from rest_framework import generics,status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.middleware import csrf
from .authenticate import CustomAuthentication

class RegisterApi(APIView):

    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    def post(self,request):
        try:
            data = request.data
            username = data['username']
            password = data['password']
            email = data['email']
            if User.objects.filter(username=username).exists():
                return Response({
                    "message":"username "+username+ " already exists"
                })
            elif User.objects.filter(email = email).exists():
                return Response({
                    "message":"email already in use"
                })

            user = User.objects.create_user(username=username,email=email,password=password)
            user.save()
            return Response({
                'status':200,
                'username': username,
                'password':password,
                'email':email
            })

        except Exception as e:
            return Response({
                "message":"unknown error occured"
            })

class LoginApi(APIView):


    def post(self,request):
        try:
            data = request.data
            serializer = LoginSerializer(data = data)
            if serializer.is_valid():
                username = serializer.data['username']
                password = serializer.data['password']
                user = auth.authenticate(username=username,password=password)
                if not user:
                    return Response({
                        'message':'invalid details entered'
                    },status=status.HTTP_404_NOT_FOUND)
                else:
                    refresh = RefreshToken.for_user(user)
                    res = Response()
                    res.set_cookie(
                        key = settings.SIMPLE_JWT['AUTH_COOKIE'], 
                        value = refresh.access_token,
                        expires = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                        secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                        httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                        samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
                    )
                    csrf.get_token(request)
                    res.data = {
                        'refresh':str(refresh),
                        'access':str(refresh.access_token)
                    }
                    return res
            else:
                return Response({
                    'message':'Error occured'
                },status=status.HTTP_404_FORBIDDEN)
        except Exception as e:
            return Response({
                'message':"error is" + str(e)
            },status=status.HTTP_404_NOT_FOUND)
        
class LogoutApi(APIView):

    def get(self,request):
        res = Response()
        res.delete_cookie('access_token')
        res.data = {
            'message':'done'
        }
        return res

class ReturnDataApi(APIView):
    authentication_classes = [JWTAuthentication,CustomAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request):
        try:
            return Response({
                'status':200,
                'message':'done'
            })
        except:
            return Response({
                'status':404,
                'message':'error'
            })


