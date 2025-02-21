import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Regresa a la página anterior
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700/50 to-indigo-900/50 p-6">
      <div className="bg-violet-950/95 border border-gray-800 p-8 rounded-2xl shadow-xl w-96 mt-10">
        <h1 className="text-center text-4xl font-extrabold text-white mb-4">🚫 Página No Encontrada 🚫</h1>
        <p className="text-center text-2xl font-semibold text-gray-200 mb-6">La ruta que has intentado acceder no existe.</p>
        <p className="text-center text-gray-400 mb-4">Por favor verifica la URL o regresa a la página anterior.</p>
        <button
          onClick={goBack}
          className="w-full text-gray-200 bg-yellow-500 py-2 rounded-lg mt-4 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Regresar Atrás
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
