from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import User, Product, Cart, CartItem, Order, OrderItem
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Sum
from django.shortcuts import get_object_or_404

# Register
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

# Login
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data
    refresh = RefreshToken.for_user(user)
    return Response({'token': str(refresh.access_token), 'role': user.role})

# Products
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

# Dashboard
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_view(request):
    products = Product.objects.count()
    customers = User.objects.filter(role='user').count()
    orders = Order.objects.count()
    return Response({'products':products,'customers':customers,'orders':orders})

# Cart
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def cart_view(request):
    cart, _ = Cart.objects.get_or_create(user=request.user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request, product_id):
    cart, _ = Cart.objects.get_or_create(user=request.user)
    product = get_object_or_404(Product, id=product_id)
    
    # This finds the item or creates a new one with a default quantity of 1.
    # 'created' will be True if it's new, False if it was found.
    item, created = CartItem.objects.get_or_create(cart=cart, product=product)

    # This is the crucial part:
    # We ONLY increase the quantity if the item was already in the cart (if not created).
    if not created:
        item.quantity += 1
        item.save()
    
    return Response({'status': 'added'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def checkout_view(request):
    cart, _ = Cart.objects.get_or_create(user=request.user)
    if cart.items.count()==0: return Response({'status':'empty'}, status=400)
    order = Order.objects.create(user=request.user)
    for item in cart.items.all():
        OrderItem.objects.create(order=order, product=item.product, quantity=item.quantity)
    cart.items.all().delete()
    return Response({'status':'order placed'})

# Users (admin only)
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
