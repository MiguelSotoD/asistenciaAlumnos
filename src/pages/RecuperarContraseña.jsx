import { useState } from 'react';

const RecuperarContraseña = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar el correo de recuperación
        alert('Se ha enviado un correo de recuperación a ' + email);
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg shadow-gray w-4/5 max-w-md">
                <h2 className="text-3xl font-bold mb-6">Recuperar Contraseña</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-semibold mb-2">Correo Electrónico</label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-green" />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-button-primary text-white p-1.5 rounded-lg w-1/2 hover:bg-button-secondary transition duration-300 cursor-pointer">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RecuperarContraseña;
