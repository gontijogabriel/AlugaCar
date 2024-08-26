from django.urls import path

from cars.views import CarsListView, CarDetailView

urlpatterns = [
    path('cars/', CarsListView.as_view(), name='cars-list'),
    path('cars/<int:pk>/', CarDetailView.as_view(), name='car-detail'),
]
