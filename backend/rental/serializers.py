from datetime import date
from rest_framework import serializers, permissions

from rental.models import Rental


class RentalSerializer(serializers.ModelSerializer):
    permission_classes = [permissions.AllowAny]

    class Meta:
        model = Rental
        fields = ['id', 'start_date', 'end_date']


class RentalDetailSerializer(serializers.ModelSerializer):
    permission_classes = [permissions.IsAuthenticated]

    class Meta:
        model = Rental
        fields = ['start_date', 'end_date', 'car', 'user']

    def validate_start_date(self, value):
        if value < date.today():
            raise serializers.ValidationError("The start date cannot be in the past.")
        return value

    def validate_end_date(self, value):
        start_date = self.initial_data.get('start_date')
        if start_date and value < date.fromisoformat(start_date):
            raise serializers.ValidationError("The end date cannot be before the start date.")
        return value


class RentalUserAuthList(serializers.ModelSerializer):
    permission_classes = [permissions.IsAuthenticated]

    class Meta:
        model = Rental
        fields = '__all__'