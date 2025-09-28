from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api.views import (
    ProductViewSet, UserViewSet,
    login_view, RegisterView,
    dashboard_view, cart_view, add_to_cart, checkout_view
)

router = routers.DefaultRouter()
router.register(r'products', ProductViewSet, basename='products')
router.register(r'users', UserViewSet, basename='users')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
