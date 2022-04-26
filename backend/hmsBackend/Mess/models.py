from django.db import models


# Create your models here.

##### Tables ######
# Item (id, name, brand, desc, category)
# Category (id, name, desc)

class Category(models.Model):
    name = models.CharField(null=False, max_length=20, blank=False, unique=True)
    desc = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Item(models.Model):
    name = models.CharField(null=False, max_length=50, blank=False, unique=True)
    brand = models.CharField(max_length=50, default="Unknown")
    desc = models.CharField(max_length=200)
    category = models.ForeignKey(Category,null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name
