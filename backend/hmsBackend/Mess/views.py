from unicodedata import category, name
from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from Mess.serializer import CategorySerializer
from .models import Category, Item
from django.utils.text import slugify

# Create your views here.

@api_view(['POST'])
def create_item(request):
    serializer = Item(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=201)
    return Response({}, status=400)

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

