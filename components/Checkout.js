import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('sua_chave_publica_do_stripe');

const Checkout = () => {
    const [nome, setNome] = useState('');
    const [servico, setServico] = useState('');
    const [valor, setValor] = useState(0);
    const [message, setMessage] = useState('');

    const servicos = [
        { nome: "Sobrancelha Navalhada", preco: 15 },
        { nome: "Depilação Nasal com Cera", preco: 15 },
        { nome: "Escovação/Penteado", preco: 20 },
        { nome: "Pezinho", preco: 15 },
        { nome: "Platinado", preco: 170 },
        { nome: "Corte + Barboterapia Toalha Quente", preco: 95 },
        { nome: "Barboterapia Toalha Quente", preco: 45 },
        { nome: "Corte + Barba Econômica", preco: 85 },
        { nome: "Corte", preco: 50 },
        { nome: "Barba Econômica", preco: 35 },
        { nome: "Acabamento de Corte Econômico", preco: 35 },
    ];

    const handleServicoChange = (e) => {
        const servicoSelecionado = servicos.find(s => s.nome === e.target.value);
        setServico(servicoSelecionado.nome);
        setValor(servicoSelecionado.preco);
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        const stripe = await stripePromise;

        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, servico, valor }),
        });

        const sessionId = await response.json();
        const result = await stripe.redirectToCheckout({ sessionId });

        if (result.error) {
            setMessage(result.error.message);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>
            <form onSubmit={handleCheckout} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label className="block text-gray-700">Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Serviço:</label>
                    <select
                        onChange={handleServicoChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    >
                        <option value="">Selecione um serviço</option>
                        {servicos.map((s) => (
                            <option key={s.nome} value={s.nome}>{s.nome}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <p className="text-lg font-semibold">Valor: R${valor.toFixed(2)}</p>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out">
                    Pagar
                </button>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </form>
        </div>
    );
};

export default Checkout;
