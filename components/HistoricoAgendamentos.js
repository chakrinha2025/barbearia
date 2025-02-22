import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const HistoricoAgendamentos = () => {
    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchAgendamentos = async () => {
            const token = localStorage.getItem('access_token');
            const response = await fetch('/api/meus-agendamentos/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAgendamentos(data);
            } else {
                setMessage('Erro ao carregar agendamentos.');
            }
            setLoading(false);
        };

        fetchAgendamentos();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="p-4"
        >
            <h2 className="text-2xl font-bold mb-4 text-center">Histórico de Agendamentos</h2>
            {loading ? (
                <p className="text-center">Carregando agendamentos...</p>
            ) : (
                <>
                    {message && <p className="text-center text-red-500">{message}</p>}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="py-2 px-4 border-b">Nome</th>
                                    <th className="py-2 px-4 border-b">Serviço</th>
                                    <th className="py-2 px-4 border-b">Data</th>
                                    <th className="py-2 px-4 border-b">Hora</th>
                                </tr>
                            </thead>
                            <tbody>
                                {agendamentos.map((agendamento) => (
                                    <tr key={agendamento.id} className="hover:bg-gray-100 transition duration-300 ease-in-out">
                                        <td className="py-2 px-4 border-b">{agendamento.nome}</td>
                                        <td className="py-2 px-4 border-b">{agendamento.servico}</td>
                                        <td className="py-2 px-4 border-b">{agendamento.data}</td>
                                        <td className="py-2 px-4 border-b">{agendamento.hora}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </motion.div>
    );
};

export default HistoricoAgendamentos; 