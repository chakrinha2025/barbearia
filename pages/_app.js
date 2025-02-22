import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <ToastContainer />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
