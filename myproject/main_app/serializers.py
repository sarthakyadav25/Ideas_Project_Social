from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Post,Profile,LikedPost,SavedPost

class LikedPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikedPost
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class SavedPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedPost
        fields = '__all__'

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()





        