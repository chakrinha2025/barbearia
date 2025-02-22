import React, { useState } from 'react';

const RecuperarSenha = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/reset-password/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            alert('Email de recuperação enviado!');
        } else {
            alert('Erro ao enviar email. Verifique o endereço.');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Recuperar Senha</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">
                    Enviar Email
                </button>
            </form>
        </div>
    );
};

export default RecuperarSenha; 