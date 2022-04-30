from django.urls import path, include
from . import views

urlpatterns = [
    path('item/', views.item_controller, name='items'),
    path('category/', views.category_controller, name='categories'),
    path('demand/', views.demand_controller, name='demand'),
    path('stock/',views.stock_controller,name='stocks'),
    path('action/',views.action_controller,name='actions'),
]
