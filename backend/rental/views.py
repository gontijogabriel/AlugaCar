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
    
    def perform_create(self, serializer):
        car = serializer.validated_data['car']
        start_date = serializer.validated_data['start_date']
        end_date = serializer.validated_data['end_date']
        rental_days = (end_date - start_date).days + 1
        total_value = rental_days * car.day_price
        
        serializer.save(user=self.request.user, value=total_value)
        

class RentalAuthUserListView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RentalUserAuthList

    def get_queryset(self):
        return Rental.objects.filter(user=self.request.user)