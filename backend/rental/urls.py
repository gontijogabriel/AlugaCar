from django.urls import path

from rental.views import RentalListCreateView, RentalUserListView


urlpatterns = [
    path('rental/', RentalListCreateView.as_view(), name='rental-list-create'),
    path('rental/auth-user/', RentalUserListView.as_view(), name='rental-list-auth-user'),
]