import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Feedback = () => {
    const [servico, setServico] = useState('');
    const [comentario, setComentario] = useState('');
    const [avaliacao, setAvaliacao] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');

        const response = await fetch('/api/feedback/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ servico, comentario, avaliacao }),
        });

        if (response.ok) {
            toast.success('Feedback enviado com sucesso!');
            setServico('');
            setComentario('');
            setAvaliacao(1);
        } else {
            toast.error('Erro ao enviar feedback.');
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
            <h2 className="text-2xl font-bold mb-4 text-center">Deixe seu Feedback</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label className="block text-gray-700">Serviço:</label>
                    <input
                        type="text"
                        value={servico}
                        onChange={(e) => setServico(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 transition duration-300 ease-in-out"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Comentário:</label>
                    <textarea
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 transition duration-300 ease-in-out"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Avaliação:</label>
                    <select
                        value={avaliacao}
                        onChange={(e) => setAvaliacao(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 transition duration-300 ease-in-out"
                        required
                    >
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out">
                    Enviar Feedback
                </button>
            </form>
        </motion.div>
    );
};

export default Feedback;