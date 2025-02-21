import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const RoleNotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      // Si no hay token, redirigir al login
      navigate("/");
      return;
    }

    const decodedToken = jwtDecode(token);
    const role = decodedToken.role ? decodedToken.role.toLowerCase() : "";

    // Si el rol es 'turista', redirigir al login o página de acceso denegado
    if (role === "cliente") {
      navigate("/tours");
    } else if (role === "") {
      // Si no hay rol (vacío), redirigir al login
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700/50 to-indigo-900/50 p-6">
      <div className="bg-violet-950/95 border border-gray-800 p-8 rounded-2xl shadow-xl w-96 mt-10">
        <h1 className="text-center text-4xl font-extrabold text-white mb-4">⚠️ Acceso Denegado ⚠️</h1>
        <p className="text-center text-2xl font-semibold text-gray-200 mb-6">Tu rol no está autorizado para acceder a esta sección.</p>
        <p className="text-center text-gray-400 mb-4">Si crees que esto es un error, por favor contacta al administrador.</p>
        <p className="text-center text-yellow-400 font-semibold mt-4">Espere a que su rol sea cambiado...</p>
      </div>
    </div>
  );
};

export default RoleNotFound;
