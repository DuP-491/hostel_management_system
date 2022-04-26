from django.urls import path,include
from . import views

urlpatterns = [
    path('category/', views.categories_controller, name='categories-controller'),
]
