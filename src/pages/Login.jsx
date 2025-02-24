const Login = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg shadow-gray w-4/5 max-w-md">
                <div className="flex justify-items-start mb-12 gap-x-6">
                    <img src="https://i0.wp.com/utd.edu.mx/wp-content/uploads/2022/07/LOGO-UTD-NUEVO-2022_solo-01.png?fit=1024%2C387&ssl=1" alt="Company Logo" className="h-8 w-20" />
                    <h2 className="text-3xl font-bold">Iniciar Sesión</h2>
                </div>
                
                <form>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-semibold mb-2">Correo Electrónico</label>
                        <input type="email" id="email" name="email" className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-green" />
                    </div>
                    <div className="mb-10">
                        <label htmlFor="password" className="block text-sm font-semibold mb-2">Contraseña</label>
                        <input type="password" id="password" name="password" className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green" />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-button-primary text-white p-1.5 rounded-lg w-1/2 hover:bg-button-secondary transition duration-300 cursor-pointer">Iniciar Sesión</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
