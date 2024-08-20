from django.contrib import admin
from cars.models import Images, Cars


@admin.register(Images)
class ImagesAdmin(admin.ModelAdmin):
    list_display = ('url',)
    search_fields = ('url',)


@admin.register(Cars)
class CarsAdmin(admin.ModelAdmin):
    list_display = ('model', 'brand', 'type', 'category', 'status', 'day_price', 'seats', 'odometer')
    list_filter = ('type', 'category', 'status')
    search_fields = ('model', 'brand')
    filter_horizontal = ('images',)