from django.urls import path
from . import views
from .views import LikeRecipeView, ToggleRecipeStatusView

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('recipes/', views.list_recipes, name='list_recipes'),
    path('recipes/create/', views.create_recipe, name='create_recipe'),
    path('recipes/<int:pk>/', views.recipe_detail, name='recipe_detail'),
    path('recipes/<int:pk>/update/', views.update_recipe, name='update_recipe'),
    path('recipes/<int:pk>/delete/', views.delete_recipe, name='delete_recipe'),
    path('recipes/<int:pk>/toggle-status/', ToggleRecipeStatusView.as_view(), name='toggle_recipe_status'),
    path('recipes/<int:recipe_id>/like/', LikeRecipeView.as_view(), name='like_recipe'),
    path('users/', views.UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', views.UserDetailView.as_view(), name='user-detail'),
    path('follow/', views.follow_user, name='follow_user'),
    path('unfollow/', views.unfollow_user, name='unfollow_user'),

]
