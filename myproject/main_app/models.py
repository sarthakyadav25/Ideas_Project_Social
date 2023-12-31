from django.db import models
from django.contrib.auth import get_user_model
import uuid

User = get_user_model()

# Create your models here.

class Profile(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    email = models.CharField(max_length=100)
    interested_tech_stacks = models.CharField(max_length=100)
    github_link = models.CharField(max_length=200,default="#")
    twitter_link = models.CharField(max_length=200,default="#")
    linkedin_link = models.CharField(max_length=200,default="#")
    linktree_link = models.CharField(max_length=200,default="#")
    cover_pic = models.ImageField(upload_to='cover_pics',default='default_cover_pic.jpg')
    profile_pic = models.ImageField(upload_to='profile_pics',default='default_profile_pic.png')

    def __str__(self):
        return self.user.username

class Post(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    username = models.CharField(max_length=100,default="GuestUser")
    post_pic = models.ImageField(upload_to='post_pics')
    title = models.CharField(max_length=100)
    description = models.TextField()
    problem_statement = models.TextField(blank=True)
    tech_stack = models.CharField(max_length=100)
    project_link_github = models.CharField(max_length=200,default="#")
    project_link_live = models.CharField(max_length=200,default="#")
    no_of_likes = models.IntegerField(default=0)
    type = models.CharField(max_length=100,default='Project')

    def __str__(self):
        return self.user.username
    
class LikedPost(models.Model):
    post_id = models.CharField(max_length=100)
    username = models.CharField(max_length=100)

    def __str__(self):
        return self.username
    
class SavedPost(models.Model):
    username=  models.CharField(max_length=100)
    post_id = models.CharField(max_length=100)

    def __str__(self):
        return self.username



