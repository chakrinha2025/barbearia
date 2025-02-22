import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Registro = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        // Validação simples
        if (!username || !email || !phone || !password || !confirmPassword) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, phone, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Erro ao registrar. Verifique os dados.');
            }

            const data = await response.json();
            console.log('Usuário registrado com sucesso:', data);
            toast.success('Registro realizado com sucesso!');
            // Redirecionar ou mostrar mensagem de sucesso
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="p-4"
        >
            <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleRegister} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label className="block text-gray-700">Nome de Usuário:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Ex: Carlos"
                        required
                        className={`mt-1 block w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 transition duration-300 ease-in-out`}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex: seuemail@seuemail.com"
                        required
                        className={`mt-1 block w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 transition duration-300 ease-in-out`}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Número de Telefone:</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ex: (49) 9999-9999"
                        required
                        className={`mt-1 block w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 transition duration-300 ease-in-out`}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                        required
                        className={`mt-1 block w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 transition duration-300 ease-in-out`}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Confirme a Senha:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirme sua senha"
                        required
                        className={`mt-1 block w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 transition duration-300 ease-in-out`}
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out">
                    Registrar
                </button>
            </form>
        </motion.div>
    );
};

export default Registro; 