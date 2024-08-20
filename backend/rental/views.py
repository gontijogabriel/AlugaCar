from rest_framework import generics, permissions

from rental.serializers import RentalSerializer, RentalDetailSerializer, RentalUserAuthList
from rental.models import Rental


class RentalListCreateView(generics.ListCreateAPIView):
    queryset = Rental.objects.all()

    def get_permissions(self):
        if self.request.method == "POST":
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return RentalDetailSerializer
        return RentalSerializer


class RentalAuthUserListView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RentalUserAuthList

    def get_queryset(self):
        return Rental.objects.filter(user=self.request.user)