import React, { useState } from 'react';

const Agendamento = () => {
    const [nome, setNome] = useState('');
    const [servico, setServico] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const servicos = [
        "Sobrancelha Navalhada",
        "Depilação Nasal com Cera",
        "Escovação/Penteado",
        "Pezinho",
        "Platinado",
        "Corte + Barboterapia Toalha Quente",
        "Barboterapia Toalha Quente",
        "Corte + Barba Econômica",
        "Corte",
        "Barba Econômica",
        "Acabamento de Corte Econômico"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        const response = await fetch('/api/agendamentos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, servico, data, hora }),
        });

        setLoading(false);
        if (response.ok) {
            setMessage('Agendamento realizado com sucesso!');
        } else {
            setMessage('Erro ao realizar o agendamento.');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Agendamento de Serviços</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
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
                        value={servico}
                        onChange={(e) => setServico(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    >
                        <option value="">Selecione um serviço</option>
                        {servicos.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Data:</label>
                    <input
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Hora:</label>
                    <input
                        type="time"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out">
                    {loading ? 'Carregando...' : 'Agendar'}
                </button>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </form>
        </div>
    );
};

export default Agendamento; 