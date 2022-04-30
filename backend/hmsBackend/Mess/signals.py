from django.db.models.signals import post_save, pre_delete, pre_save, post_delete
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import *


@receiver(post_save, sender=Item)
def create_stock(sender, instance, created, **kwargs):
    if created:
        Stock.objects.create(item=instance)


@receiver(post_save, sender=Action)
def update_stock(sender, instance, created, **kwargs):
    id = instance.item.id
    stock = Stock.objects.get(item=id)
    if instance.action == 1:
        stock.quantity = stock.quantity + instance.quantity
    elif instance.action == 2:
        stock.quantity = stock.quantity - instance.quantity
    stock.save()

# @receiver(post_save, sender=Item)
# def save_stock(sender, instance, **kwargs):
#     instance.stock.save()


@receiver(pre_save, sender=DemandItem)
def demand_item_created_handler(sender, instance, *args, **kwargs):
    instance.prevInstance = DemandItem.objects.filter(id=instance.id)


@receiver(post_save, sender=DemandItem)
def demand_item_created_handler(sender, instance, created, *args, **kwargs):
    # print(4)
    demand = instance.demandId
    item = instance.itemId
    if created:
        # new item added
        demand.itemCount = demand.itemCount + 1
    else:
        # item updated
        demand.totalAmount -= instance.prevInstance[0].amount
        demand.totalAmount += instance.amount
        Action.objects.create(
            item=item,
            action=1,
            quantity=instance.suppliedQuantity
        )
    demand.save()


@receiver(post_delete, sender=DemandItem)
def demand_item_removed_handler(sender, instance, *args, **kwargs):
    demand = instance.demandId
    demand.itemCount = demand.itemCount - 1
    demand.totalAmount -= instance.amount
    demand.save()
