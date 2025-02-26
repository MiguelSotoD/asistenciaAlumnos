import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captchaValue, setCaptchaValue] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (captchaValue) {
            // Aquí puedes agregar la lógica de autenticación
            navigate('/Inicio-alumnos');
        } else {
            alert('Por favor, verifica que eres un humano.');
        }
    };

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg shadow-gray w-4/5 max-w-md">
                <div className="flex justify-items-start mb-12 gap-x-6">
                    <img src="https://i0.wp.com/utd.edu.mx/wp-content/uploads/2022/07/LOGO-UTD-NUEVO-2022_solo-01.png?fit=1024%2C387&ssl=1" alt="Company Logo" className="h-8 w-20" />
                    <h2 className="text-3xl font-bold">Iniciar Sesión</h2>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-semibold mb-2">Correo Electrónico</label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-green" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block text-sm font-semibold mb-2">Contraseña</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green" />
                    </div>
                    <div className="mb-4 flex justify-center">
                        <ReCAPTCHA
                            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                            onChange={handleCaptchaChange}
                        />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-button-primary text-white p-1.5 rounded-lg w-1/2 hover:bg-button-secondary transition duration-300 cursor-pointer">Iniciar Sesión</button>
                    </div>
                </form>
                <div className="flex justify-center mt-4">
                    <a href="/recuperar-contraseña" className="text-sm text-blue-500 hover:underline">¿Olvidaste tu contraseña?</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
