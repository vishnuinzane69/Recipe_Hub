from rest_framework import serializers
from .models import profile_auth, Recipe, Like,Follow
from django.contrib.auth.models import User

class ProfileAuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = profile_auth
        fields = ['id', 'email', 'password']

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'
        read_only_fields = ['likes_count']

class UserSerializer(serializers.ModelSerializer):
    date_joined = serializers.DateTimeField(read_only=True)
    followers_count = serializers.SerializerMethodField()
    is_followed = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'date_joined', 'followers_count', 'is_followed']

    def get_followers_count(self, obj):
        return Follow.objects.filter(followed=obj).count()

    def get_is_followed(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Follow.objects.filter(follower=request.user, followed=obj).exists()
        return False
    


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ['id', 'follower', 'followed', ]