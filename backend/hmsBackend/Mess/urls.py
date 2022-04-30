from django.urls import path, include
from . import views

urlpatterns = [
    path('item/', views.item_controller, name='items'),
    path('category/', views.category_controller, name='categories'),
    path('demand/', views.demand_controller, name='demands'),
    path('ditem/', views.demand_item_controller, name='ditems')
]
