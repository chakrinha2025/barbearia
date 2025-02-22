import React, { useEffect, useState } from 'react';

const PainelAdmin = () => {
    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchAgendamentos = async () => {
            const response = await fetch('/api/agendamentos/');
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

    const handleDelete = async (id) => {
        const response = await fetch(`/api/agendamentos/${id}/`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setAgendamentos(agendamentos.filter(agendamento => agendamento.id !== id));
            setMessage('Agendamento cancelado com sucesso!');
        } else {
            setMessage('Erro ao cancelar agendamento.');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Painel Administrativo</h2>
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
                                    <th className="py-2 px-4 border-b">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {agendamentos.map((agendamento) => (
                                    <tr key={agendamento.id} className="hover:bg-gray-100 transition duration-300 ease-in-out">
                                        <td className="py-2 px-4 border-b">{agendamento.nome}</td>
                                        <td className="py-2 px-4 border-b">{agendamento.servico}</td>
                                        <td className="py-2 px-4 border-b">{agendamento.data}</td>
                                        <td className="py-2 px-4 border-b">{agendamento.hora}</td>
                                        <td className="py-2 px-4 border-b">
                                            <button
                                                onClick={() => handleDelete(agendamento.id)}
                                                className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out"
                                            >
                                                Cancelar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default PainelAdmin; 