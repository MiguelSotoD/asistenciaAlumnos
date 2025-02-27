import { useState } from 'react';
export default function FormNewGroup({ onSubmit }) {
    const [grupo, setGrupo] = useState('');
    const [carrera, setCarrera] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(grupo, carrera);
    };
    return(
        <div className="flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg shadow-gray w-4/5 max-w-md">
                <h2 className="text-3xl font-bold mb-8 text-center">Agregar Nuevo grupo</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="grupo" className="block text-sm font-semibold mb-2">Número de Grupo</label>
                        <input 
                            type="text" 
                            id="grupo" 
                            value={grupo} 
                            onChange={(e) => setGrupo(e.target.value)} 
                            className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-green" 
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="carrera" className="block text-sm font-semibold mb-2">Carrera</label>
                        <input 
                            type="text" 
                            id="carrera" 
                            value={carrera} 
                            onChange={(e) => setCarrera(e.target.value)} 
                            className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-green" 
                        />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-button-primary text-white p-1.5 rounded-lg w-1/2 hover:bg-button-secondary transition duration-300 cursor-pointer">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}