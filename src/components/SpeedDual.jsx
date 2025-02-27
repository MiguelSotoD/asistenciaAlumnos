import { useNavigate } from 'react-router-dom';

export default function SpeedDual() {
    const navigate = useNavigate();

    return (
        <div data-dial-init className="fixed end-6 bottom-6 group">
            <button 
                type="button" 
                data-dial-toggle="speed-dial-menu-click" 
                data-dial-trigger="click" 
                aria-controls="speed-dial-menu-click" 
                aria-expanded="false" 
                className="flex items-center justify-center text-white bg-button-secondary rounded-full w-14 h-14 hover:bg-button-primary dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800 cursor-pointer"
                onClick={() => navigate('/Agregar-Nuevo-Grupo')}
            >
                <svg className="w-5 h-5 transition-transform group-hover:rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                </svg>
                <span className="sr-only">Open actions menu</span>
            </button>
        </div>
    );
}