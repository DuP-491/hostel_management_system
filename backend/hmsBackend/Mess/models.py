from django.db import models


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
