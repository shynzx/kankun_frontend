import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Ícono de Google

function Registro() {
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const nombre = e.target.nombre.value.trim();
        const apellidos = e.target.apellidos.value.trim();
        const email = e.target.email.value.trim();
        const password = e.target.password.value.trim();
        const confirmPassword = e.target.confirmPassword.value.trim();

        if (!nombre || !apellidos || !email || !password || !confirmPassword) {
            setError("Todos los campos son obligatorios");
            return;
        }

        if (password.length > 40 || confirmPassword.length > 40) {
            setError("Máximo 40 caracteres por campo");
            return;
        }

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        setError("");
        alert("Registro exitoso");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700/50 to-indigo-900/50 p-6">
            <div className="bg-violet-950/95 border border-gray-800 p-8 rounded-2xl shadow-xl w-96 mt-10">
                <h1 className="text-center text-4xl font-extrabold text-white mb-4">Kankun</h1>
                <h2 className="text-center text-2xl font-semibold text-gray-200 mb-6">Registro</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <input type="text" name="nombre" placeholder="Nombre" className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-200" />
                    <input type="text" name="apellidos" placeholder="Apellidos" className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-200" />
                    <input type="email" name="email" placeholder="Correo electrónico" className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-200" />
                    <input type="password" name="password" placeholder="Contraseña" className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-200" maxLength="40" />
                    <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-200" maxLength="40" />
                    <button className="w-full p-3 bg-zinc-100 text-black font-semibold rounded-lg hover:bg-zinc-900 transition duration-300 hover:text-white">Registrarse</button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                    ¿Ya tienes una cuenta? <a href="/" className="text-white font-semibold hover:underline">Inicia sesión</a>
                </p>

                <div className="mt-4">
                    <button className="w-full p-3 bg-zinc-900 text-white font-semibold rounded-lg hover:bg-zinc-100 transition duration-300 flex items-center justify-center gap-2 hover:text-black">
                        <FcGoogle className="w-5 h-5" />
                        Registrarse con Google
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Registro;
