from rest_framework import serializers, permissions

from rental.models import Rental


class RentalSerializer(serializers.ModelSerializer):
    permission_classes = [permissions.AllowAny]

    class Meta:
        model = Rental
        fields = ['start_date', 'end_date']


class RentalDetailSerializer(serializers.ModelSerializer):
    permission_classes = [permissions.IsAdminUser]

    class Meta:
        model = Rental
        fields = '__all__'


class RentalUserAuthList(serializers.ModelSerializer):
    permission_classes = [permissions.IsAuthenticated]

    class Meta:
        model = Rental
        fields = '__all__'