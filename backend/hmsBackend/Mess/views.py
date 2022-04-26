from django.shortcuts import render,get_object_or_404
from django.utils.text import slugify
from rest_framework import serializers,status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import Item,Category
from .serializer import ItemSerializer,CategorySerializer
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

def delete_item(request):
    message=''
    item = Item.objects.filter(name=request.data['name'])
    if len(item) == '0':
        message = 'Item with given name does not exist'
    else:
        item.delete()
        message = "Item Deleted Successfully"
    return Response({
        "message" : message
    })

@api_view(['POST','PUT'])
def update_item(request):
    pass

############ Category #############

# Method to handle all requests
@api_view(['POST', 'GET', 'DELETE'])
def categories_controller(request):
    if request.method == "POST":
        return create_category(request)
    elif request.method == "GET":
        return get_categories(request)
    elif request.method == "DELETE":
        return delete_category(request)

# Method to create a new category
def create_category(request):
    request.data['name'] = slugify(request.data['name'])
    category = CategorySerializer(data=request.data)
    if category.is_valid():
        category.save()
        return Response({
            "status": "success",
            "message": "Category added successfully!",
            "data": category.data
        })
    else:
        return Response({
            "status": "failed",
            "message": "An error occurred while adding the category."
        })

# Method to fetch all existing categories
def get_categories(request):
    categories = Category.objects.all()
    size = categories.count()
    data = CategorySerializer(categories, many=True)
    return Response({
        "status": "success",
        "size": size,
        "data": data.data
    })

# Method to delete a specific category
def delete_category(request):
    category = get_object_or_404(Category, name=request.data['name'])
    category.delete()
    return Response({
        "status": "success",
        "message": "Category removed successfully!"
    })

