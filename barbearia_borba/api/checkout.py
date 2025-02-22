import stripe
from django.conf import settings
from django.http import JsonResponse
from django.views import View

stripe.api_key = settings.STRIPE_SECRET_KEY

class CreateCheckoutSession(View):
    def post(self, request):
        data = json.loads(request.body)
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': 'brl',
                        'product_data': {
                            'name': data['servico'],
                        },
                        'unit_amount': int(data['valor'] * 100),  # Valor em centavos
                    },
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url='http://localhost:3000/sucesso',
            cancel_url='http://localhost:3000/cancelar',
        )
        return JsonResponse(session.id, safe=False) 