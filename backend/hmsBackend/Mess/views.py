from datetime import datetime
import uuid
from xmlrpc.client import DateTime
from django.shortcuts import render, get_object_or_404
from django.utils.text import slugify
from pytz import timezone
from rest_framework import serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import Item, Category, Action, Stock
from .serializer import ItemSerializer, CategorySerializer, StockSerializer, ActionSerializer,StockSerializerCreate,ActionSerializerCreate
from .models import Item, Category, Demand, DemandItem
from .serializer import DemandSerializer, ItemSerializer, CategorySerializer, DemandItemSerializer

############ Item #############


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

    print(request.query_params)

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
    item = get_object_or_404(Item, id=id)
    request.data['nameSlug'] = slugify(request.data['name'])
    message = ''
    serializer = ItemSerializer(item, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(
            status=200,
            data={
                "status": "success",
                "message": "Item updated successfully!",
                "data": serializer.data
            }
        )
    else:
        return Response(
            status=400,
            data={
                "status": "failed",
                "message": "Error updating the item!"
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


############ Demand #############

# Method to handle all requests


@api_view(['POST', 'GET', 'DELETE', 'PUT'])
def demand_controller(request):
    if request.method == "POST":
        return create_demand(request)
    elif request.method == "GET":
        return get_demands(request)
    elif request.method == "DELETE":
        return delete_demand(request)
    elif request.method == "PUT":
        return update_demand(request)


# Method to create a new demand


def create_demand(request):
    request.data['id'] = str(uuid.uuid4())
    request.data['date'] = datetime.now()
    demand = DemandSerializer(data=request.data)
    if demand.is_valid():
        demand.save()
        return Response(
            status=200,
            data={
                "status": "success",
                "message": "Demand added successfully!",
                "data": demand.data
            }
        )
    else:
        print(demand.errors)
        return Response(
            status=400,
            data={
                "status": "failed",
                "message": "An error occurred while adding the demand."
            }
        )

# Method to fetch all existing demands


def get_demands(request):
    demands = Demand.objects.all()
    size = demands.count()
    data = DemandSerializer(demands, many=True)
    return Response(
        status=200,
        data={
            "status": "success",
            "size": size,
            "data": data.data
        }
    )

# Method to delete a specific demand


def delete_demand(request):
    demand = get_object_or_404(Demand, id=request.data['id'])
    demand.delete()
    return Response(
        status=204,
        data={
            "status": "success",
            "message": "Demand removed successfully!"
        }
    )

# Method to update a demand


def update_demand(request):
    demand = get_object_or_404(Demand, id=request.data['id'])
    serializer = DemandSerializer(demand, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(
            status=200,
            data={
                "status": "success",
                "message": "Demand updated successfully!",
                "data": serializer.data
            }
        )
    else:
        return Response(
            status=400,
            data={
                "status": "failed",
                "message": "Error updating the demand!"
            }
        )


############ DemandItem #############

# Method to handle all requests


@api_view(['POST', 'GET', 'DELETE', 'PUT'])
def demand_item_controller(request):
    if request.method == "POST":
        return create_demand_item(request)
    elif request.method == "GET":
        return get_demand_items(request)
    elif request.method == "DELETE":
        return delete_demand_item(request)
    elif request.method == "PUT":
        return update_demand_item(request)


# Method to create a new demand


def create_demand_item(request):
    request.data['id'] = str(uuid.uuid4())
    demandItem = DemandItemSerializer(data=request.data)
    if demandItem.is_valid():
        demandItem.save()
        return Response(
            status=200,
            data={
                "status": "success",
                "message": "Demand item added successfully!",
                "data": demandItem.data
            }
        )
    else:
        print(demandItem.errors)
        return Response(
            status=400,
            data={
                "status": "failed",
                "message": "An error occurred while adding the demand item."
            }
        )

# Method to fetch all existing demands


def get_demand_items(request):
    demandItems = DemandItem.objects.all()
    size = demandItems.count()
    data = DemandItemSerializer(demandItems, many=True)
    return Response(
        status=200,
        data={
            "status": "success",
            "size": size,
            "data": data.data
        }
    )

# Method to delete a specific demand


def delete_demand_item(request):
    demandItem = get_object_or_404(DemandItem, id=request.data['id'])
    demandItem.delete()
    return Response(
        status=204,
        data={
            "status": "success",
            "message": "Demand item removed successfully!"
        }
    )

# Method to update a demand


def update_demand_item(request):
    demandItem = get_object_or_404(DemandItem, id=request.data['id'])
    serializer = DemandItemSerializer(
        demandItem, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(
            status=200,
            data={
                "status": "success",
                "message": "Demand item updated successfully!",
                "data": serializer.data
            }
        )
    else:
        return Response(
            status=400,
            data={
                "status": "failed",
                "message": "Error updating the demand item!"
            }
        )


############ Stock #############
@api_view(['GET', 'PUT'])
def stock_controller(request):
    if request.method == 'GET':
        return get_stock(request)
    if request.method == 'POST':
        pass
    if request.method == 'PUT':
        return update_stock(request)
    if request.method == 'DELETE':
        pass


def get_stock(request):
    stocks = Stock.objects.all()
    query = request.query_params.get('item')
    if query is not None:
        stocks = stocks.filter(item=query)
    size = stocks.count()
    serializer = StockSerializer(stocks, many=True)
    return Response(
        status=201,
        data={
            "status": "success",
            "size": size,
            "data": serializer.data
        }
    )


def update_stock(request):
    id = request.data['id']
    if id is None:
        return Response(
            status=403,
            data={
                "data": "id not provided"
            }
        )
    item = get_object_or_404(Item, id=id)
    stocks = get_object_or_404(Stock, item=item)
    serializer = StockSerializer(stocks, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
    return Response(
        status=201,
        data={
            "data": serializer.data,
            "message": "Unit Updated Successfully"
        }
    )

############ ACTION #############


@api_view(['GET', 'POST'])
def action_controller(request):
    if request.method == 'GET':
        return get_actions(request)
    if request.method == 'POST':
        return create_action(request)


def create_action(request):
    serializer = ActionSerializerCreate(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(
            status=201,
            data={
                "status": "success",
                "message": "Action added successfully!",
                "data": serializer.data
            },
        )
    else:
        return Response(
            status=400,
            data={
                "status": "failed",
                "message": "An error occurred while adding the action."
            }
        )


def get_actions(request):

    actions = Action.objects.all()
    query = request.query_params.get('item')
    if query is not None:
        actions = actions.filter(item=query)
    size = actions.count()
    serializer = ActionSerializer(actions, many=True)
    return Response(
        status=201,
        data={
            "status": "success",
            "size": size,
            "data": serializer.data
        },
    )
