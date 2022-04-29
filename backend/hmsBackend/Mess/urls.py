from django.urls import path, include
from . import views

urlpatterns = [
    path('item/', views.item_controller, name='items'),
    path('category/', views.category_controller, name='categories'),
]
