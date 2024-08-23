from rest_framework_simplejwt.views import TokenObtainPairView
from core.serializers import TokenPairSerializer


class TokenPairView(TokenObtainPairView):
    serializer_class = TokenPairSerializer