from rest_framework import generics, permissions

from cars.models import Cars
from cars.serializers import CarsSerializer, CarsDetailSerializer


class CarsListCreateView(generics.ListCreateAPIView):
    queryset = Cars.objects.all()

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = [permissions.IsAdminUser]
        else:
            self.permission_classes = [permissions.IsAuthenticatedOrReadOnly]
        return super().get_permissions()
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CarsDetailSerializer
        return CarsSerializer


class CarsDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cars.objects.all()
    serializer_class = CarsDetailSerializer

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            self.permission_classes = [permissions.IsAdminUser]
        else:
            self.permission_classes = [permissions.IsAuthenticatedOrReadOnly]
        return super().get_permissions()
