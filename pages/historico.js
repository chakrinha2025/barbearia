import React from 'react';
import HistoricoAgendamentos from '../components/HistoricoAgendamentos';
import withAuth from '../components/withAuth';

const HistoricoPage = () => {
    return (
        <div>
            <HistoricoAgendamentos />
        </div>
    );
};

export default withAuth(HistoricoPage); 