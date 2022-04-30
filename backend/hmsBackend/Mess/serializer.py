from dataclasses import field
from rest_framework import serializers
from .models import Category, Item ,Action,Stock

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=Item
        fields='__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields='__all__'

class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = '__all__'

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'