from rest_framework import generics, permissions, status
from rest_framework.response import Response

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


class SimilarCarsView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CarsSerializer

    def get_queryset(self):
        type = self.kwargs.get('type')

        if type:
            return Cars.objects.filter(type=type.upper())[:4]
        else:
            return Cars.objects.none()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        if not queryset.exists():
            return Response(
                {"detail": "No cars found for this category."},
                status=status.HTTP_404_NOT_FOUND,
            )
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)