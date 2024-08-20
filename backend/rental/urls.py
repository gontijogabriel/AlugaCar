from django.urls import path

from rental.views import RentalListCreateView, RentalAuthUserListView


urlpatterns = [
    path('rental/', RentalListCreateView.as_view(), name='rental-list-create'),
    path('rental/user-auth/', RentalAuthUserListView.as_view(), name='rental-list-auth-user'),
]