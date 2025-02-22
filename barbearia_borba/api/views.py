from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from twilio.rest import Client
from django.conf import settings
from rest_framework import viewsets
from .models import Servico
from .serializers import ServicoSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Agendamento
from .serializers import AgendamentoSerializer
from .serializers import UserSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Feedback
from .serializers import FeedbackSerializer
import stripe

# Create your views here.

class PagamentoView(APIView):
    def post(self, request):
        try:
            # Lógica para processar o pagamento
            # Exemplo: stripe.Charge.create(...)
            return Response({"message": "Pagamento realizado com sucesso!"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

def enviar_mensagem_whatsapp(nome, servico, data, hora, numero_cliente):
    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
    mensagem = f"Olá {nome}, seu agendamento para {servico} está confirmado para {data} às {hora}."
    
    client.messages.create(
        body=mensagem,
        from_=settings.TWILIO_WHATSAPP_NUMBER,
        to=f'whatsapp:{numero_cliente}'
    )

class ServicoViewSet(viewsets.ModelViewSet):
    queryset = Servico.objects.all()
    serializer_class = ServicoSerializer


class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

class UserAgendamentosView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AgendamentoSerializer

    def get_queryset(self):
        return Agendamento.objects.filter(usuario=self.request.user)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        
        if user is not None:
            return Response({"message": "Login bem-sucedido!"})
        else:
            return Response({"error": "Credenciais inválidas."}, status=400)

class AgendamentoViewSet(viewsets.ModelViewSet):
    queryset = Agendamento.objects.all()
    serializer_class = AgendamentoSerializer

class CreateCheckoutSession(APIView):
    def post(self, request):
        YOUR_DOMAIN = "http://localhost:8000"
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': 'T-shirt',
                        },
                        'unit_amount': 2000,
                    },
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=YOUR_DOMAIN + '/success/',
            cancel_url=YOUR_DOMAIN + '/cancel/',
        )
        return Response({'id': checkout_session.id})
