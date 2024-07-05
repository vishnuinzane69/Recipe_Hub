from django.core.validators import validate_email
from django import forms
from django.db import models
from django.contrib.auth.models import User
from django.db.models import F

class profile_auth(models.Model):
    email = models.CharField(max_length=100, validators=[validate_email])
    password = models.CharField(max_length=50)


class Recipe(models.Model):
    title = models.CharField(max_length=255)
    ingredients = models.TextField()
    steps = models.TextField()
    cooking_time = models.PositiveIntegerField()  # In minutes
    difficulty_level = models.CharField(max_length=50)
    image = models.ImageField(upload_to='media/', null=True)
    enabled = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    category = models.CharField(max_length=50, null=True, blank=True)
    likes_count = models.PositiveIntegerField(default=0)

    def increment_likes(self):
        self.likes_count = F('likes_count') + 1
        self.save()

    def decrement_likes(self):
        self.likes_count = F('likes_count') - 1
        self.save()

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.recipe.increment_likes()
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.recipe.decrement_likes()
        super().delete(*args, **kwargs)

class Follow(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following')
    followed = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers')
    created_at = models.DateTimeField(auto_now_add=True)


    
    


