import React, { useState } from "react";
import { FcGoogle} from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Importa jwt-decode correctamente

function Login() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [inputError, setInputError] = useState({ email: false, password: false });
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value.trim();
        const password = e.target.password.value.trim();

        let newInputError = { 
            email: !email || !validateEmail(email), 
            password: !password 
        };
        setInputError(newInputError);

        if (!email || !password) {
            setError("Todos los campos son obligatorios");
            return;
        }

        if (!validateEmail(email)) {
            setError("Por favor, introduce un correo electrónico válido");
            return;
        }

        if (email.length > 40 || password.length > 40) {
            setError("Máximo 40 caracteres por campo");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/token", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ username: email, password }),
            });

            if (!response.ok) {
                throw new Error("Correo o contraseña incorrectos");
            }

            const data = await response.json();

            // Descodificar el token y obtener el rol
            const decodedToken = jwtDecode(data.access_token);
            console.log("Datos del token decodificado:", decodedToken);
            const role = decodedToken.role ? decodedToken.role.toLowerCase() : "";

            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            localStorage.setItem("correo_usuario", email);

            setSuccess(true);
            setError("");

            setTimeout(() => {
                if (role === "turista") {
                    navigate("/tours");
                } else if (role === "administrador") {
                    navigate("/dashboard");
                } else {
                    navigate("/rol-no-existe");
                }
            }, 2000);
        } catch (err) {
            setError(err.message || "Error en la autenticación");
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700/50 to-indigo-900/50 p-6">
            <div className="bg-violet-950/95 border border-gray-800 p-8 rounded-2xl shadow-xl w-96 mt-10">
                <h1 className="text-center text-4xl font-extrabold text-white mb-4">Kankun</h1>
                <h2 className="text-center text-2xl font-semibold text-gray-200 mb-6">Iniciar Sesión</h2>

                <AnimatePresence>
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            className="bg-green-500 text-white p-3 rounded-lg mb-4 text-center"
                        >
                            Inicio de sesión exitoso! Redirigiendo...
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {error && (
                        <motion.p
                            key="error"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-500 text-center mb-4"
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-gray-300 mb-1">Correo electrónico</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email"
                            className={`w-full p-3 border ${inputError.email ? 'border-red-500' : 'border-gray-600'} rounded-lg bg-gray-700/50 text-gray-200`} 
                            placeholder="Correo electrónico"
                            maxLength="40"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-300 mb-1">Contraseña</label>
                        <input 
                            type="password" 
                            id="password"
                            name="password"
                            className={`w-full p-3 border ${inputError.password ? 'border-red-500' : 'border-gray-600'} rounded-lg bg-gray-700/50 text-gray-200`} 
                            placeholder="Contraseña"
                            maxLength="40"
                            required
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full p-3 bg-zinc-100 text-black font-semibold rounded-lg hover:bg-zinc-900 transition duration-300 hover:text-white"
                    >
                        Iniciar sesión
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                    ¿No tienes una cuenta? <a href="/registro" className="text-white font-semibold hover:underline">Regístrate</a>
                </p>

                <button 
                    className="mt-4 w-full p-3 bg-zinc-900 text-white font-semibold rounded-lg hover:bg-zinc-100 transition duration-300 flex items-center justify-center gap-2 hover:text-black"
                >
                    <FcGoogle className="w-5 h-5" />
                    Iniciar con Google
                </button>
            </div>
        </div>
    );
}

export default Login;
