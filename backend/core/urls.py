from django.contrib import admin
from django.urls import path, include

from rest_framework import permissions
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from core.views import TokenPairView

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="API AlugaCar",
        default_version='v1',
        description="Documentation AlugaCar API",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="gontijogabr@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,)
)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path('auth/token/', TokenPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/v1/', include('user.urls')),
    path('api/v1/', include('cars.urls')),
    path('api/v1/', include('rental.urls')),
]