import React from 'react';

function Login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 p-6">
            <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-2xl w-96 mt-10">
                <h1 className="text-center text-4xl font-extrabold text-purple-700 mb-4">Kankun</h1>
                <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Iniciar Sesión</h2>
                <form className="space-y-5">
                    <div>
                        <input 
                            type="email" 
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                            placeholder="Correo electrónico"
                        />
                    </div>
                    <div>
                        <input 
                            type="password" 
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                            placeholder="Contraseña"
                        />
                    </div>
                    <button className="w-full p-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300">Iniciar sesión</button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    ¿No tienes una cuenta? <a href="./registro.jsx" className="text-purple-600 font-semibold hover:underline">Regístrate</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
