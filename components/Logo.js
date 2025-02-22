import React from 'react';
import { motion } from 'framer-motion';

const Logo = () => {
    return (
        <motion.div 
            className="text-3xl font-bold text-blue-500"
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 0.5 }}
        >
            <span>BB</span> Barbearia do Borba
        </motion.div>
    );
};

export default Logo; 