from rest_framework import generics, permissions
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Count

from cars.models import Cars
from cars.serializers import CarsSerializer, CarsDetailSerializer
from cars.pagination import CarsPagination


class CarsListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Cars.objects.all()
    serializer_class = CarsSerializer
    filter_backends = [DjangoFilterBackend]
    pagination_class = CarsPagination

    def get_queryset(self):
        queryset = super().get_queryset()
        price_min = self.request.query_params.get('price_min', None)
        price_max = self.request.query_params.get('price_max', None)
        category = self.request.query_params.get('category', None)
        car_type = self.request.query_params.get('type', None)
        search = self.request.query_params.get('search', None)

        if search is not None:
            queryset = queryset.filter(model__contains=search)
        if price_min is not None:
            queryset = queryset.filter(day_price__gte=price_min)
        if price_max is not None:
            queryset = queryset.filter(day_price__lte=price_max)
        if category:
            queryset = queryset.filter(category=category.upper())
        if car_type:
            queryset = queryset.filter(type=car_type.upper())

        return queryset


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
