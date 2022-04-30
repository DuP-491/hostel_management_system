from dataclasses import field
from pkg_resources import require
from rest_framework import serializers
from .models import Category, Item ,Action,Stock
from .models import Category, Item, Demand, DemandItem


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields='__all__'

class ActionSerializer(serializers.ModelSerializer):
    action = serializers.CharField(
        source='get_action_display'
    )
    class Meta:
        model = Action
        fields = '__all__'

class ActionSerializerCreate(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = '__all__'

class StockSerializer(serializers.ModelSerializer):
    item = ItemSerializer()
    unit = serializers.CharField(
        source='get_unit_display'
    )
    class Meta:
        model = Stock
        fields = '__all__'

class StockSerializerCreate(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'


class DemandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demand
        fields = '__all__'


class DemandItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = DemandItem
        fields = '__all__'
