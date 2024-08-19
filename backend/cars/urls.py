from django.urls import path

from cars.views import CarsListCreateView, CarsDetailView

urlpatterns = [
    path('cars/', CarsListCreateView.as_view(), name='cars-list-create'),
    path('cars/<int:pk>/', CarsDetailView.as_view(), name='car-detail'),
]
