from django.shortcuts import render
from django.utils.text import slugify
from rest_framework import serializers,status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import Item
from .serializer import ItemSerializer
# Create your views here.

@api_view(['GET','POST','PUT','DELETE'])
def item(request):
    if request.method=='GET':
       return get_items(request)
    elif request.method=='POST':
        return create_item(request)
    elif request.method=='PUT':
        pass
    elif request.method=='DELETE':
        pass

def create_item(request):
    request.data['name'] = slugify(request.data['name'])
    serializer = ItemSerializer(data=request.data)
    # if Item.objects.filter(name=serializer.name).exists():
    #     raise serializers.ValidationError('This data already exists')
    if serializer.is_valid(raise_exception=True):
        # serializer.data.values('name') = slugify(serializer.data.values('name'),)
        serializer.save()
        return Response(serializer.data, status=201)
    else:
        return Response({}, status=400)

def get_items(request):
    items= Item.objects.all()
    serializer=ItemSerializer(items,many=True)
    return Response(serializer.data,status=200)

def update_item(request):
    pass








