import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
    const AuthenticatedComponent = (props) => {
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                router.push('/login');
            }
        }, [router]);

        return <WrappedComponent {...props} />;
    };

    AuthenticatedComponent.displayName = 'WithAuth(' + (WrappedComponent.displayName || WrappedComponent.name) + ')';

    return AuthenticatedComponent;
};

export default withAuth; 