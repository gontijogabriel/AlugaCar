from rest_framework import generics, permissions
from rest_framework.response import Response

from django.db.models import Count

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


class CarsFilterView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        category_counts = Cars.objects.values('category').annotate(count=Count('category'))
        categories = [
            {
                'name': item['category'],
                'count': item['count']
            } for item in category_counts
        ]

        type_counts = Cars.objects.values('type').annotate(count=Count('type'))
        types = [
            {
                'name': item['type'],
                'count': item['count']
            } for item in type_counts
        ]

        data = {
            'categories': categories,
            'types': types
        }
        
        return Response(data)
