import React from "react";

const CrearTour: React.FC = () => {
  return (
    <div className="min-h-screen bg-purple-200 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <div className="bg-purple-700 text-white p-4 rounded-lg mb-6 flex justify-between">
          <h1 className="text-lg font-semibold">KANKUN</h1>
          <div className="flex gap-4 text-sm">
            <span>Panel de control</span>
            <span className="border-b">Crear Tour</span>
            <span>Crear Actividad</span>
            <span>Registrar Admin</span>
          </div>
          <span className="font-semibold">Bienvenido Admin</span>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-100 border-dashed border-2 border-gray-300 flex justify-center items-center h-40 rounded-lg">
            <span className="text-gray-500">Agregar imagen</span>
          </div>

          <div className="space-y-3">
            <input className="w-full border rounded p-2 bg-white text-gray-900" placeholder="Nombre del Tour" />
            <input className="w-full border rounded p-2 bg-white text-gray-900" placeholder="Recorrido" />
            <textarea className="w-full border rounded p-2 bg-white text-gray-900" placeholder="Detalles"></textarea>
            <textarea className="w-full border rounded p-2 bg-white text-gray-900" placeholder="Qué incluye"></textarea>
            <textarea className="w-full border rounded p-2 bg-white text-gray-900" placeholder="Información relevante"></textarea>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-gray-700">Duración del Tour</label>
            <input className="w-full border rounded p-2 bg-white text-gray-900" placeholder="hr, min" />
          </div>

          <div>
            <label className="block text-gray-700">Agregar actividad Existente</label>
            <select className="w-full border rounded p-2 bg-white text-gray-900">
              <option>Selecciona una actividad</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Agregar actividad Manualmente</label>
          <div className="flex items-center justify-between border rounded p-2">
            <input className="w-full outline-none bg-white text-gray-900" placeholder="Nombre de la actividad" />
            <button className="text-purple-700 text-xl font-bold">+</button>
          </div> 
        </div>

        <div className="grid grid-cols-2 gap-6 mt-4">
          <div>
            <label className="block text-gray-700">Itinerario</label>
            <input className="w-full border rounded p-2 bg-white text-gray-900" placeholder="..." />
          </div>

          <div>
            <label className="block text-gray-700">Total a pagar</label>
            <input className="w-full border rounded p-2 bg-white text-gray-900" placeholder="$ MXN" />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-gray-700">Ubicación</label>
          <div className="bg-gray-100 border rounded h-32 flex justify-center items-center">
            <span className="text-gray-500">Mapa aquí</span>
          </div>
          <button className="mt-2 bg-purple-700 text-white px-4 py-2 rounded">
            Insertar ubicación
          </button>
        </div>

        <div className="mt-6 flex justify-center">
          <button className="bg-purple-700 text-white px-6 py-2 rounded-lg">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrearTour;
