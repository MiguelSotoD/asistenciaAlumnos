import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
            <p className="text-lg mb-4">Lo sentimos, la página que estás buscando no existe.</p>
            <button
                onClick={handleGoBack}
                className="bg-button-primary text-white p-1.5 rounded-lg hover:bg-button-secondary transition duration-300 cursor-pointer"
            >
                Volver al inicio
            </button>
        </div>
    );
};

export default ErrorPage;
