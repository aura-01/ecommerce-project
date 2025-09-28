from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', login_view, name='login'),
    path('dashboard/', dashboard_view, name='dashboard'),
    path('cart/', cart_view, name='cart'),
    path('cart/add/<int:product_id>/', add_to_cart, name='add-to-cart'),
    path('orders/', checkout_view, name='checkout'),
    path('', include(router.urls)),
]
