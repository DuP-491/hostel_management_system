from dataclasses import field
from pkg_resources import require
from rest_framework import serializers
from .models import Category, Item, Demand, DemandItem


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class DemandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demand
        fields = '__all__'


class DemandItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = DemandItem
        fields = '__all__'
