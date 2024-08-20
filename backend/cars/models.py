from django.db import models

from core.models import BaseModel

import uuid 


class Images(BaseModel):
    url = models.URLField()

    class Meta:
        db_table = 'images'
        managed = True
        verbose_name = 'Image'
        verbose_name_plural = 'Images'

    def __str__(self):
        return self.url
    

class Cars(models.Model):
    CAR_TYPES = [
        ('SUV', 'SUV'),
        ('SEDAN', 'Sedan'),
        ('HATCHBACK', 'Hatchback'),
        ('COUPE', 'Coupe'),
        ('WAGON', 'Wagon'),
        ('PICKUP', 'Pickup'),
    ]

    CAR_CATEGORIES = [
        ('ECONOMY', 'Economy'),
        ('LUXURY', 'Luxury'),
        ('SPORT', 'Sport'),
        ('OFFROAD', 'Off-road'),
        ('VAN', 'Van'),
    ]

    model = models.CharField(max_length=150, blank=False, null=False)
    brand = models.CharField(max_length=150, blank=False, null=False)
    type = models.CharField(max_length=50, choices=CAR_TYPES, blank=False, null=False)
    category = models.CharField(max_length=50, choices=CAR_CATEGORIES, blank=False, null=False)
    description = models.TextField(blank=True, null=True)
    status = models.BooleanField(default=True)
    day_price = models.DecimalField(max_digits=10, decimal_places=2)
    seats = models.IntegerField()
    odometer = models.IntegerField()
    images = models.ManyToManyField(Images, related_name='cars')

    class Meta:
        db_table = 'cars'
        managed = True
        verbose_name = 'Car'
        verbose_name_plural = 'Cars'

    def __str__(self):
        return self.model