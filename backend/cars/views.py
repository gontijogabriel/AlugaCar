from rest_framework import generics, permissions, status
from rest_framework.response import Response

from cars.models import Cars
from cars.serializers import CarsSerializer, CarsDetailSerializer


class CarsListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Cars.objects.all()
    serializer_class = CarsSerializer


class CarDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Cars.objects.all()
    serializer_class = CarsDetailSerializer