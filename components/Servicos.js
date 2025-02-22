import React from 'react';

const Servicos = () => {
    const servicos = {
        "Daniel Borba": [
            { nome: "Sobrancelha Navalhada", preco: "R$15,00", duracao: "5 min" },
            { nome: "Depilação Nasal com Cera", preco: "R$15,00", duracao: "15 min" },
            { nome: "Escovação/Penteado", preco: "R$20,00", duracao: "10 min" },
            { nome: "Pezinho", preco: "R$15,00", duracao: "5 min" },
            { nome: "Platinado", preco: "R$170,00", duracao: "5h30min" },
            { nome: "Corte + Barboterapia Toalha Quente", preco: "R$95,00", duracao: "1h" },
            { nome: "Barboterapia Toalha Quente", preco: "R$45,00", duracao: "20 min" },
            { nome: "Corte + Barba Econômica", preco: "R$85,00", duracao: "45 min" },
            { nome: "Corte", preco: "R$50,00 por R$45,00", duracao: "40 min" },
            { nome: "Barba Econômica", preco: "R$35,00", duracao: "10 min" },
            { nome: "Acabamento de Corte Econômico", preco: "R$35,00", duracao: "10 min" },
        ],
        "Deivid Batista": [
            { nome: "Sobrancelha Navalhada", preco: "R$15,00", duracao: "5 min" },
            { nome: "Depilação Nasal com Cera", preco: "R$15,00", duracao: "15 min" },
            { nome: "Escovação/Penteado", preco: "R$20,00", duracao: "10 min" },
            { nome: "Pezinho", preco: "R$15,00", duracao: "5 min" },
            { nome: "Platinado", preco: "R$160,00", duracao: "5h30min" },
            { nome: "Corte + Barboterapia Toalha Quente", preco: "R$80,00", duracao: "1h" },
            { nome: "Barboterapia Toalha Quente", preco: "R$40,00", duracao: "20 min" },
            { nome: "Corte + Barba Econômica", preco: "R$70,00", duracao: "45 min" },
            { nome: "Corte", preco: "R$40,00 por R$36,00", duracao: "40 min" },
            { nome: "Barba Econômica", preco: "R$30,00", duracao: "10 min" },
            { nome: "Acabamento de Corte Econômico", preco: "R$30,00", duracao: "10 min" },
        ]
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Lista de Serviços</h2>
            {Object.keys(servicos).map(barbeiro => (
                <div key={barbeiro} className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">{`Serviços de ${barbeiro}:`}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {servicos[barbeiro].map(servico => (
                            <div key={servico.nome} className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
                                <h4 className="font-medium text-lg">{servico.nome}</h4>
                                <p className="text-gray-600">{`${servico.preco} (${servico.duracao})`}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Servicos; 