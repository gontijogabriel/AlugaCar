from django.db import models

from core.models import BaseModel

from user.models import User

from cars.models import Cars


class Rental(BaseModel):

    STATUS_CHOICES = [
        ('AWAITING_PAYMENT', 'Awaiting Payment'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'),
        ('CANCELED', 'Canceled'),
    ]

    car = models.ForeignKey(Cars, on_delete=models.CASCADE, related_name='rentals')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rentals')
    start_date = models.DateField(blank=False, null=False)
    end_date = models.DateField(blank=False, null=False)
    value = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='AWAITING_PAYMENT')
    odometer_last = models.IntegerField()

    class Meta:
        db_table = 'rentals'
        managed = True
        verbose_name = 'Rental'
        verbose_name_plural = 'Rentals'

    def __str__(self):
        return f"Rental {self.id} - {self.car} by {self.user}"
    

class Payment(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')
    rentail = models.ForeignKey(Rental, on_delete=models.CASCADE, related_name='payments')
    status = models.BooleanField(default=False)

    class Meta:
        db_table = 'payments'
        managed = True
        verbose_name = 'Payment'
        verbose_name_plural = 'Payments'

    def __str__(self):
        return f"Payment {self.user} - {self.rentail}: {self.status}"