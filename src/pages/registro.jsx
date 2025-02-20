import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion"; // Importamos animación

function Registro() {
    const [error, setError] = useState("");
    const [inputError, setInputError] = useState({ nombre: false, apellidos: false, email: false, password: false, confirmPassword: false });

    const handleSubmit = (e) => {
        e.preventDefault();
        const nombre = e.target.nombre.value.trim();
        const apellidos = e.target.apellidos.value.trim();
        const email = e.target.email.value.trim();
        const password = e.target.password.value.trim();
        const confirmPassword = e.target.confirmPassword.value.trim();

        let newInputError = {
            nombre: !nombre,
            apellidos: !apellidos,
            email: !email,
            password: !password,
            confirmPassword: !confirmPassword || password !== confirmPassword
        };

        setInputError(newInputError);

        if (Object.values(newInputError).some(val => val)) {
            setError("Todos los campos son obligatorios y las contraseñas deben coincidir");
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
                    {[{ name: 'nombre', placeholder: 'Nombre Completo' }, { name: 'email', placeholder: 'Correo electrónico' }, { name: 'password', placeholder: 'Contraseña' }, { name: 'confirmPassword', placeholder: 'Confirmar contraseña' }].map((field, index) => (
                        <motion.div 
                            key={index} 
                            animate={inputError[field.name] ? { x: [-5, 5, -5, 5, 0] } : {}}
                            transition={{ duration: 0.3 }}
                        >
                            <input 
                                type={field.name.includes("password") ? "password" : "text"} 
                                name={field.name} 
                                placeholder={field.placeholder} 
                                className={`w-full p-3 border ${inputError[field.name] ? 'border-red-500' : 'border-gray-600'} rounded-lg bg-gray-700/50 text-gray-200`} 
                                maxLength={field.name.includes("password") ? 40 : undefined}
                            />
                        </motion.div>
                    ))}
                    <motion.button 
                        className="w-full p-3 bg-zinc-100 text-black font-semibold rounded-lg hover:bg-zinc-900 transition duration-300 hover:text-white"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Registrarse
                    </motion.button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                    ¿Ya tienes una cuenta? <a href="/" className="text-white font-semibold hover:underline">Inicia sesión</a>
                </p>

                <div className="mt-4">
                    <motion.button 
                        className="w-full p-3 bg-zinc-900 text-white font-semibold rounded-lg hover:bg-zinc-100 transition duration-300 flex items-center justify-center gap-2 hover:text-black"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FcGoogle className="w-5 h-5" />
                        Registrarse con Google
                    </motion.button>
                </div>
            </div>
        </div>
    );
}

export default Registro;
