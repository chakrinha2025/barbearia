import React from 'react';
import PainelAdmin from '../components/PainelAdmin';
import GerenciarServicos from '../components/GerenciarServicos';
import withAuth from '../components/withAuth';

const PainelPage = () => {
    return (
        <div>
            <PainelAdmin />
            <GerenciarServicos />
        </div>
    );
};

export default withAuth(PainelPage); 