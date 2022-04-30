import uuid
from django.shortcuts import render, get_object_or_404
from django.utils.text import slugify
from rest_framework import serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import Item, Category,Action,Stock
from .serializer import ItemSerializer, CategorySerializer,StockSerializer,ActionSerializer

# Create your views here.


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def item_controller(request):
    if request.method == 'GET':
        return get_items(request)
    elif request.method == 'POST':
        return create_item(request)
    elif request.method == 'PUT':
        return update_item(request)
    elif request.method == 'DELETE':
        return delete_item(request)


def create_item(request):
    request.data['nameSlug'] = slugify(request.data['name'])
    request.data['id'] = str(uuid.uuid4())

    serializer = ItemSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(
            status=201,
            data={
                "status": "success",
                "message": "Item added successfully!",
                "data": serializer.data
            },
        )
    else:
        return Response(
            status=400,
            data={
                "status": "failed",
                "message": "An error occurred while adding the item."
            }
        )


def get_items(request):
    items = Item.objects.all()

    # URL of the form search=field-1:value-1,field-2:value-2...
    # This is the logic to parse such string
    query = request.query_params.get('search')
    if query is not None:
        for x in query.split(","):
            y = x.split(":")
            y[0] = y[0] + "__icontains"
            print(y[0], y[1])
            items = items.filter(**{y[0]: y[1]})

    size = items.count()
    serializer = ItemSerializer(items, many=True)
    return Response(
        status=200,
        data={
            "status": "success",
            "size": size,
            "data": serializer.data
        }
    )


def delete_item(request):
    item = get_object_or_404(Item, id=request.data['id'])
    item.delete()
    return Response(
        status=204,
        data={
            "status": "success",
            "message": "Item removed successfully!"
        }
    )

def update_item(request):
    id = request.data['id']
    item = get_object_or_404(Item,id=id)
    request.data['nameSlug'] = slugify(request.data['name'])
    message = ''
    serializer = ItemSerializer(item,data=request.data,partial=True)
    if serializer.is_valid():
        serializer.save()
        message = 'Item updated successfully'
    else:
        message = 'There was some error in updating item'
    return Response(
        status=200,
        data={
            "status":message,
            "data":serializer.data
        }
    )

############ Category #############

# Method to handle all requests


@api_view(['POST', 'GET', 'DELETE'])
def category_controller(request):
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
        return Response(
            status=200,
            data={
                "status": "success",
                "message": "Category added successfully!",
                "data": category.data
            }
        )
    else:
        return Response(
            status=400,
            data={
                "status": "failed",
                "message": "An error occurred while adding the category."
            }
        )

# Method to fetch all existing categories


def get_categories(request):
    categories = Category.objects.all()
    size = categories.count()
    data = CategorySerializer(categories, many=True)
    return Response(
        status=200,
        data={
            "status": "success",
            "size": size,
            "data": data.data
        }
    )

# Method to delete a specific category


def delete_category(request):
    category = get_object_or_404(Category, name=request.data['name'])
    category.delete()
    return Response(
        status=204,
        data={
            "status": "success",
            "message": "Category removed successfully!"
        }
    )

############ Stock #############
@api_view(['GET'])
def stock_controller(request):
    if request.method == 'GET':
        pass
    if request.method == 'POST':
        pass
    if request.method == 'PUT':
        pass
    if request.method == 'DELETE':
        pass

def get_stock(request):
    id = request.data['id']
    item = get_object_or_404(Item,id=id)
    stocks = get_object_or_404(Stock,id=id)


############ ACTION #############

def action_controller(request):
    if request.method == 'GET':
        pass
    if request.method == 'POST':
        pass
    if request.method == 'PUT':
        pass
    if request.method == 'DELETE':
        pass



