from rest_framework import generics, permissions

from user.models import User
from user.serializers import UserSerializer


class UserView(generics.ListAPIView, generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer