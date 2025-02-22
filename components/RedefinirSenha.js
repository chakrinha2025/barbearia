import React, { useState } from 'react';
import { useRouter } from 'next/router';

const RedefinirSenha = () => {
    const router = useRouter();
    const { uid, token } = router.query;
    const [novaSenha, setNovaSenha] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/reset-password-confirm/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid, token, novaSenha }),
        });

        if (response.ok) {
            alert('Senha redefinida com sucesso!');
            router.push('/login');
        } else {
            alert('Erro ao redefinir a senha. Tente novamente.');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Redefinir Senha</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label className="block text-gray-700">Nova Senha:</label>
                    <input
                        type="password"
                        value={novaSenha}
                        onChange={(e) => setNovaSenha(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">
                    Redefinir Senha
                </button>
            </form>
        </div>
    );
};

export default RedefinirSenha; 