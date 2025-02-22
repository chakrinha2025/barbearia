from django.urls import path
from .views import AgendamentoViewSet, CreateCheckoutSession, RegisterView, LoginView, PasswordResetView, PasswordResetConfirmView, ServicoViewSet, FeedbackViewSet, UserAgendamentosView
from rest_framework import generics
from .serializers import UserSerializer
from django.contrib.auth.models import User

class RegisterView(generics.CreateAPIView):
       queryset = User.objects.all()
       serializer_class = UserSerializer

urlpatterns = [
    path('api/register/', RegisterView.as_view(), name='register'),
    path('agendamentos/', AgendamentoViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('create-checkout-session/', CreateCheckoutSession.as_view(), name='create-checkout-session'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('reset-password/', PasswordResetView.as_view(), name='reset-password'),
    path('reset-password-confirm/', PasswordResetConfirmView.as_view(), name='reset-password-confirm'),
    path('servicos/', ServicoViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('servicos/<int:pk>/', ServicoViewSet.as_view({'put': 'update', 'delete': 'destroy'})),
    path('feedback/', FeedbackViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('meus-agendamentos/', UserAgendamentosView.as_view(), name='meus-agendamentos'),
] 