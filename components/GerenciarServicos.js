import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const GerenciarServicos = () => {
    const [servicos, setServicos] = useState([]);
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [duracao, setDuracao] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServicos = async () => {
            const response = await fetch('/api/servicos/');
            if (response.ok) {
                const data = await response.json();
                setServicos(data);
            } else {
                setMessage('Erro ao carregar serviços.');
            }
            setLoading(false);
        };

        fetchServicos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `/api/servicos/${editingId}/` : '/api/servicos/';

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, preco, duracao }),
        });

        if (response.ok) {
            toast.success(editingId ? 'Serviço atualizado com sucesso!' : 'Serviço criado com sucesso!');
            setNome('');
            setPreco('');
            setDuracao('');
            setEditingId(null);
            // Recarregar serviços
            const data = await fetch('/api/servicos/');
            setServicos(await data.json());
        } else {
            toast.error('Erro ao salvar serviço.');
        }
    };

    const handleEdit = (servico) => {
        setNome(servico.nome);
        setPreco(servico.preco);
        setDuracao(servico.duracao);
        setEditingId(servico.id);
    };

    const handleDelete = async (id) => {
        const response = await fetch(`/api/servicos/${id}/`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setServicos(servicos.filter(servico => servico.id !== id));
            toast.success('Serviço removido com sucesso!');
        } else {
            toast.error('Erro ao remover serviço.');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Gerenciar Serviços</h2>
            {loading ? (
                <p className="text-center">Carregando serviços...</p>
            ) : (
                <>
                    {message && <p className="text-center text-red-500">{message}</p>}
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700">Nome do Serviço:</label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Preço:</label>
                            <input
                                type="number"
                                value={preco}
                                onChange={(e) => setPreco(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Duração:</label>
                            <input
                                type="text"
                                value={duracao}
                                onChange={(e) => setDuracao(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out">
                            {editingId ? 'Atualizar Serviço' : 'Adicionar Serviço'}
                        </button>
                    </form>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="py-2 px-4 border-b">Nome</th>
                                    <th className="py-2 px-4 border-b">Preço</th>
                                    <th className="py-2 px-4 border-b">Duração</th>
                                    <th className="py-2 px-4 border-b">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {servicos.map((servico) => (
                                    <tr key={servico.id} className="hover:bg-gray-100 transition duration-300 ease-in-out">
                                        <td className="py-2 px-4 border-b">{servico.nome}</td>
                                        <td className="py-2 px-4 border-b">{servico.preco}</td>
                                        <td className="py-2 px-4 border-b">{servico.duracao}</td>
                                        <td className="py-2 px-4 border-b">
                                            <button
                                                onClick={() => handleEdit(servico)}
                                                className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(servico.id)}
                                                className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out ml-4"
                                            >
                                                Remover
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

export default GerenciarServicos; 