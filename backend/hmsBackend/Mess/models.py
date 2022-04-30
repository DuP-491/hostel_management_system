from enum import auto
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import dispatcher, receiver
from django.core.validators import MinValueValidator, MaxValueValidator
from django.dispatch import receiver
from django.db.models.signals import post_save


class Category(models.Model):
    name = models.CharField(
        null=False,
        max_length=20,
        blank=False,
        unique=True,
        primary_key=True
    )
    desc = models.CharField(
        max_length=200
    )

    def __str__(self):
        return self.name


class Item(models.Model):
    id = models.CharField(
        primary_key=True,
        max_length=50
    )
    name = models.CharField(
        max_length=50
    )
    nameSlug = models.CharField(
        null=False,
        blank=False,
        unique=True,
        max_length=50
    )
    brand = models.CharField(
        max_length=50
    )
    desc = models.CharField(
        max_length=200
    )
    category = models.ForeignKey(
        Category,
        to_field="name",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


class Demand(models.Model):
    id = models.CharField(
        primary_key=True,
        max_length=50
    )
    date = models.DateTimeField(
        auto_now_add=True
    )
    itemCount = models.IntegerField(
        default=0,
        null=False,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(250)
        ]
    )
    totalAmount = models.FloatField(
        default=0.0,
        null=False,
        validators=[
            MinValueValidator(0.0),
            MaxValueValidator(1000000.0)
        ]
    )
    remark = models.CharField(
        null=True,
        blank=True,
        max_length=200
    )

    def __str__(self):
        return str(self.date)


class DemandItem(models.Model):
    id = models.CharField(
        primary_key=True,
        max_length=50
    )
    itemId = models.ForeignKey(
        Item,
        to_field="id",
        on_delete=models.CASCADE
    )
    demandId = models.ForeignKey(
        Demand,
        to_field="id",
        on_delete=models.CASCADE
    )
    rate = models.FloatField(
        default=0.0
    )
    requiredQuantity = models.FloatField(
        default=0.0,
        validators=[
            MinValueValidator(0.0),
            MaxValueValidator(100000.0)
        ]
    )
    suppliedQuantity = models.FloatField(
        default=0.0,
        validators=[
            MinValueValidator(0.0),
            MaxValueValidator(100000.0)
        ]
    )
    # add unit field
    amount = models.FloatField(
        default=0.0,
        validators=[
            MinValueValidator(0.0),
            MaxValueValidator(1000000.0)
        ]
    )

    def __str__(self):
        return str(self.itemId)


class Action(models.Model):
    class Action(models.IntegerChoices):
        NOTH = 0, "Nothing"
        ADD = 1, "Added"
        SUB = 2, "Consumed"

    class Unit(models.TextChoices):
        KG = 'kg', "Kilogram"
        LT = 'lt', "Litre"
        NU = 'nu', "No Unit"

    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    action = models.IntegerField(choices=Action.choices, default=Action.NOTH)
    date = models.DateTimeField(auto_created=True)
    quantity = models.FloatField(default=0.0)
    unit = models.CharField(
        max_length=5, choices=Unit.choices, default=Unit.NU)

    def __str__(self):
        return self.item.name + " " + self.action


class Stock(models.Model):
    class Unit(models.TextChoices):
        KG = 'kg', "Kilogram"
        LT = 'lt', "Litre"
        NU = 'nu', "No Unit"

    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    unit = models.CharField(
        max_length=5, choices=Unit.choices, default=Unit.NU)
    quantity = models.FloatField(default=0.0)

    def __str__(self):
        return self.item.name + " - Stock"


@receiver(post_save, sender=DemandItem)
def demand_item_created_handler(sender, instance, created, *args, **kwargs):
    print(instance)
