from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User,auth
from .serializers import ProfileSerializer,LoginSerializer,ProjectPostSerializer,SendPostSerializer,SendProfileSerializer,IdeaPostSerializer,SavedPostSerializer
from rest_framework import generics,status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.middleware import csrf
from .authenticate import CustomAuthentication
from .models import Profile,Post,SavedPost,LikedPost
from rest_framework_simplejwt.backends import TokenBackend
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

def is_image_file(filename):
    image_extensions = ['.jpg', '.jpeg', '.png', '.gif']
    return any(filename.endswith(ext) for ext in image_extensions)

class RegisterApi(APIView):

    def post(self,request):
        try:
            data = request.data
            username = data['username']
            password = data['password']
            email = data['email']
            if User.objects.filter(username=username).exists():
                return Response({
                    "message":"username "+username+ " already exists"
                },status=status.HTTP_226_IM_USED)
            elif User.objects.filter(email = email).exists():
                return Response({
                    "message":"email already in use"
                },status=status.HTTP_226_IM_USED)

            user = User.objects.create_user(username=username,email=email,password=password)
            user.save()
            return Response({
                'username': username,
                'email':email
            },status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                "message":"unknown error occured"
            },status=status.HTTP_400_BAD_REQUEST)

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
                        samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
                    )
                    csrf.get_token(request)
                    res.data = {
                        'refresh':str(refresh),
                        'access':str(refresh.access_token),
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
        res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
        res.data = {
            'message':'done'
        }
        return res

class CheckLoginApi(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return Response({'loggedIn': True})
        else:
            return Response({'loggedIn': False})

class ProfileApi(APIView):
    authentication_classes = [JWTAuthentication,CustomAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request):
        try:
            user = request.user
            username = user.username
            user_profile = Profile.objects.get(user=user)
            profile_serial = SendProfileSerializer(user_profile)
            return Response({
                'username':username,
                'profile': profile_serial.data,
            },status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'msg': str(e),
            })
        
    def post(self,request):
        try:
            profile_serializer = ProfileSerializer(data = request.data)
            if profile_serializer.is_valid():
                bio = request.data['bio']
                try:
                    interested_tech_stacks = request.data['interested_tech_stacks']
                except:
                    interested_tech_stacks = ""
                try:
                    profile_pic = request.data['profile_pic']
                    if not is_image_file(profile_pic.name):
                        return Response({
                            'message':'Image file required'
                        })
                except:
                    profile_pic = None
                try:
                    cover_pic = request.data['cover_pic']
                    if not is_image_file(cover_pic.name):
                        return Response({
                            'message':'Image file required'
                        })
                except:
                    cover_pic = None
                user = request.user
                if Profile.objects.filter(user=user).exists():
                    profile_object = Profile.objects.get(user=user)
                    profile_object.bio = bio
                profile_object = Profile.objects.create(user=user,bio=bio,profile_pic=profile_pic,cover_pic=cover_pic,interested_tech_stacks=interested_tech_stacks,email=user.email)
                profile_object.save()
                return Response({
                    "message":"Profile Created Successfully"
                },status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'message':str(e),
            })
        
class GetUserProfileApi(APIView):
    authentication_classes = [JWTAuthentication,CustomAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request,pk):
        try:
            user = User.objects.get(username=pk)
            profile_object = Profile.objects.get(user=user)
            serial = SendProfileSerializer(profile_object)
            return Response(serial.data)
        except Exception as e:
            return Response({
                'message':str(e),
            })

        
class UploadProjectPostApi(APIView):
    authentication_classes = [JWTAuthentication,CustomAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self,request):
        try:
            post_serializer = ProjectPostSerializer(data=request.data)
            if post_serializer.is_valid():
                user  = request.user
                title = request.data['title']
                description = request.data['description']
                tech_stack = request.data['tech_stack']
                github_link = request.data['project_link_github']
                try:
                    live_link = request.data['project_link_live']
                except:
                    live_link = "#"
                try:
                    problem_statement = request.data['problem_statement']
                except:
                    problem_statement = ""
                
                try:
                    image_file = request.FILES['post_pic']
                    if not is_image_file(image_file.name):
                        return Response({
                            'message':'Required and image file'
                        },status=status.HTTP_400_BAD_REQUEST)
                except:
                    image_file = None
                post_object = Post.objects.create(user=user,post_pic = image_file,title = title,description=description,problem_statement=problem_statement,tech_stack=tech_stack,project_link_github = github_link,project_link_live = live_link)
                post_object.username = request.user.username
                post_object.type = "Project"
                post_object.save()
                return Response({
                    'message':'data saved successfully'
                },status=status.HTTP_200_OK)
            else:
                return Response({
                    'message':'error in data'
                },status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'message':str(e),
            })
        
class UploadIdeaPostApi(APIView):
    authentication_classes = [JWTAuthentication,CustomAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self,request):
        try:
            post_serializer = IdeaPostSerializer(data=request.data)
            if post_serializer.is_valid():
                user  = request.user
                title = request.data['title']
                description = request.data['description']
                tech_stack = request.data['tech_stack']
                github_link = request.data['project_link_github']
                try:
                    live_link = request.data['project_link_live']
                except:
                    live_link = "#"
                try:
                    problem_statement = request.data['problem_statement']
                except:
                    problem_statement = ""
                
                try:
                    image_file = request.FILES['post_pic']
                    if not is_image_file(image_file.name):
                        return Response({
                            'message':'Required and image file'
                        },status=status.HTTP_400_BAD_REQUEST)
                except:
                    image_file = None
                post_object = Post.objects.create(user=user,post_pic = image_file,title = title,description=description,problem_statement=problem_statement,tech_stack=tech_stack,project_link_github = github_link,project_link_live = live_link)
                post_object.username = request.user.username
                post_object.type = "Idea"
                post_object.save()
                return Response({
                    'message':'data saved successfully'
                },status=status.HTTP_200_OK)
            else:
                return Response({
                    'message':'error in data'
                },status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'message':str(e),
            })
        
        

class GetUserPostApi(APIView):
    authentication_classes = [JWTAuthentication,CustomAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request):
        try:
            user = request.user
            posts = Post.objects.filter(user=user)
            serialposts = SendPostSerializer(posts,many=True)
            return Response(serialposts.data)
        except Exception as e:
            return Response({
                'message':str(e),
            })

class GetAllPostApi(APIView):
    authentication_classes = [JWTAuthentication,CustomAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request):
        try:
            user = request.user
            posts = Post.objects.all()
            serialposts = SendPostSerializer(posts,many=True)
            return Response(serialposts.data)
        except Exception as e:
            return Response({
                'message':str(e),
            })
        
class SavePostApi(APIView):
    authentication_classes = [JWTAuthentication,CustomAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request,post_id):
        try:
            user = request.user
            if SavedPost.objects.filter(username=user.username,post_id=post_id).exists():
                saved_post_object = SavedPost.objects.get(username=user.username,post_id=post_id)
                saved_post_object.delete()
                return Response({
                    'message':"Saved post removed"
                },status=status.HTTP_200_OK)
            else:
                saved_post_object = SavedPost.objects.create(username=user.username,post_id=post_id)
                saved_post_object.save()
                return Response({
                    "message":"Post saved successfully"
                },status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error':str(e),
            })
        
class LikePostApi(APIView):

    authentication_classes = [JWTAuthentication,CustomAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request,post_id):
        try:
            user = request.user
            if LikedPost.objects.filter(username=user.username,post_id=post_id).exists():
                like_post_object = LikedPost.objects.get(username=user.username,post_id=post_id)
                post_object = Post.objects.get(id=post_id)
                post_object.no_of_likes -= 1
                like_post_object.delete()
                post_object.save()
                return Response({
                    'message':"Unliked the post"
                },status=status.HTTP_200_OK)
            else:
                like_post_object = LikedPost.objects.create(username=user.username,post_id=post_id)
                post_object = Post.objects.get(id=post_id)
                post_object.no_of_likes += 1
                like_post_object.save()
                post_object.save()
                return Response({
                    'message':"Post liked successfully"
                },status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                "error":str(e),
            })

class SendSavedPostApi(APIView):
    authentication_classes = [JWTAuthentication,CustomAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request):
        try:
            user = request.user
            user_saved_posts = SavedPost.objects.filter(username = user.username)
            saved_posts_serializer = SavedPostSerializer(user_saved_posts,many=True)
            return Response(saved_posts_serializer.data)
        except Exception as e:
            return Response({
                'error':str(e),
            })
        
class EditPostApi(APIView):
    authentication_classes = [JWTAuthentication,CustomAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self,request,post_id):
        try:
            post_object = Post.objects.get(id=post_id)
            post_object.title = request.data['title']
            post_object.description = request.data['description']
            post_object.problem_statement = request.data['problem_statement']
            post_object.tech_stack = request.data['tech_stack']
            post_object.project_link_live = request.data['project_link_live']
            post_object.project_link_github = request.data['project_link_github']
            post_pic = request.FILES['post_pic']
            if not is_image_file(post_pic.name):
                return Response({
                    'error':"Please choose an image file"
                })
            else:
                post_object.post_pic = post_pic
                post_object.save()
                return Response({
                    "message":"Post edited successfully"
                })
        except Exception as e:
            return Response({
                "error":str(e),
            })
        
class DeletePostApi(APIView):
    authentication_classes = [JWTAuthentication,CustomAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request,post_id):
        try:
            post_object = Post.objects.get(id=post_id)
            post_object.delete()
            return Response({
                "message": "Post deleted successfully"
            })
        except Exception as e:
            return Response({
                'error':str(e),
            })






        
    




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


