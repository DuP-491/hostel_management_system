from django.db.models.signals import post_save, pre_delete
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import *

@receiver(post_save, sender=Item)
def create_stock(sender, instance, created, **kwargs):
    if created:
        Stock.objects.create(item=instance)


@receiver(post_save,sender=Action)
def update_stock(sender,instance,created,**kwargs):
    id = instance.item.id
    stock = Stock.objects.get(item=id)
    if instance.action == 1:
        stock.quantity = stock.quantity + instance.quantity
    elif instance.action  == 2:
        stock.quantity = stock.quantity + instance.quantity
    stock.save()

# @receiver(post_save, sender=Item)
# def save_stock(sender, instance, **kwargs):
#     instance.stock.save()