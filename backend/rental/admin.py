from django.contrib import admin
from rental.models import Rental, Payment

@admin.register(Rental)
class RentalAdmin(admin.ModelAdmin):
    list_display = ('car', 'user', 'start_date', 'end_date', 'value', 'status', 'odometer_last')
    list_filter = ('status', 'start_date', 'end_date')
    search_fields = ('car__model', 'user__email')

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('user', 'rentail', 'status')
    list_filter = ('status',)
    search_fields = ('user__email', 'rentail__car__model')
