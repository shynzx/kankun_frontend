import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Ícono de Google

function Login() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [inputError, setInputError] = useState({ email: false, password: false });

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value.trim();
        const password = e.target.password.value.trim();

        let hasError = false;
        let newInputError = { email: false, password: false };

        if (!email) {
            newInputError.email = true;
            hasError = true;
        }
        if (!password) {
            newInputError.password = true;
            hasError = true;
        }
        if (email.length > 40 || password.length > 40) {
            setError("Máximo 40 caracteres por campo");
            return;
        }

        if (hasError) {
            setError("Todos los campos son obligatorios");
            setInputError(newInputError);
            return;
        }

        if (email !== "test@example.com" || password !== "password123") {
            setError("Correo o contraseña incorrectos");
            setInputError({ email: true, password: true });
        } else {
            setError("");
            setSuccess(true);
            setInputError({ email: false, password: false });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700/50 to-indigo-900/50 p-6">
            <div className="bg-violet-950/95 border border-gray-800 p-8 rounded-2xl shadow-xl w-96 mt-10">
                <h1 className="text-center text-4xl font-extrabold text-white mb-4">Kankun</h1>
                <h2 className="text-center text-2xl font-semibold text-gray-200 mb-6">Iniciar Sesión</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">Inicio de sesión exitoso 🎉</p>}

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <input 
                            type="email" 
                            name="email"
                            className={`w-full p-3 border ${inputError.email ? 'border-red-500' : 'border-gray-600'} rounded-lg bg-gray-700/50 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400`} 
                            placeholder="Correo electrónico"
                            maxLength="40"
                        />
                    </div>
                    <div>
                        <input 
                            type="password" 
                            name="password"
                            className={`w-full p-3 border ${inputError.password ? 'border-red-500' : 'border-gray-600'} rounded-lg bg-gray-700/50 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400`} 
                            placeholder="Contraseña"
                            maxLength="40"
                        />
                    </div>
                    <button className="w-full p-3 bg-zinc-100 text-black font-semibold rounded-lg hover:bg-zinc-900 transition duration-300 hover:text-white">
                        Iniciar sesión
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                    ¿No tienes una cuenta? <a href="/registro" className="text-white font-semibold hover:underline">Regístrate</a>
                </p>

                <div className="mt-4">
                    <button className="w-full p-3 bg-zinc-900 text-white font-semibold rounded-lg hover:bg-zinc-100 transition duration-300 flex items-center justify-center gap-2 hover:text-black">
                        <FcGoogle className="w-5 h-5" />
                        Iniciar con Google
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
