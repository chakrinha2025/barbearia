import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Logo from '../components/Logo';

const Home = () => {
    return (
        <motion.div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Cabeçalho */}
            <header className="w-full p-4 bg-white shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <Logo />
                    <nav>
                        <Link href="/registro" className="text-blue-500 mx-2">Registrar-se</Link>
                        <Link href="/login" className="text-blue-500 mx-2">Login</Link>
                        <Link href="/servicos" className="text-blue-500 mx-2">Serviços</Link>
                        <Link href="/historico" className="text-blue-500 mx-2">Histórico</Link>
                    </nav>
                </div>
            </header>

            {/* Conteúdo Principal */}
            <main className="flex flex-col items-center mt-10">
                <motion.h1 
                    className="text-5xl font-bold mb-4"
                    initial={{ opacity: 0, y: -50 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }}
                >
                    Bem-vindo à Barbearia Borba!
                </motion.h1>
                <motion.p 
                    className="text-lg mb-8"
                    initial={{ opacity: 0, y: -50 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Faça seu agendamento agora!
                </motion.p>
                <motion.div 
                    className="flex flex-col items-center"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Link href="/registro" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Comece Agora</Link>
                </motion.div>
            </main>
        </motion.div>
    );
};

export default Home; 