from django.urls import path,include
from . import views

urlpatterns = [
    path('item/',views.item,name='items'),
    path('category/', views.categories_controller, name='categories'),
]
