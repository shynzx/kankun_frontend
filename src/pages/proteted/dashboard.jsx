import React from "react";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700/50 to-indigo-900/50 p-6">
      {/* Navbar */}
      <div className="bg-violet-950/95 text-white flex justify-between p-4 rounded-md border border-gray-800">
        <h1 className="text-xl font-bold">KANKUN</h1>
        <div className="flex space-x-6">
          <a href="#" className="hover:underline">Panel de Control</a>
          <a href="#" className="hover:underline">Crear Tour</a>
          <a href="#" className="hover:underline">Crear Actividad</a>
          <a href="#" className="hover:underline">Registrar Admin</a>
        </div>
        <span className="font-semibold">Bienvenido Admin</span>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        {/* Información de Tours más reservados */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-600 text-white">
          <h2 className="text-center font-bold">Tours más reservados</h2>
          <div className="mt-4 h-32 flex items-center justify-center text-gray-400">
            [Gráfica aquí]
          </div>
        </div>

        {/* Estadísticas */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-600 text-white">
          <h2 className="text-center font-bold">Estadísticas</h2>
          <ul className="mt-4 space-y-2">
            <li className="flex justify-between"><span>Total de empleados</span><span className="font-bold">11</span></li>
            <li className="flex justify-between"><span>Total de Tours</span><span className="font-bold">7</span></li>
            <li className="flex justify-between"><span>Total de reservas</span><span className="font-bold">30</span></li>
            <li className="flex justify-between"><span>Total de ingresos</span><span className="font-bold">$4,5089</span></li>
          </ul>
        </div>

        {/* Lista de empleados */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-600 text-white">
          <h2 className="text-center font-bold">Empleados</h2>
          <button className="flex items-center justify-center w-full bg-gray-700 text-white py-2 rounded-lg mt-4 hover:bg-gray-600">
            + Agregar Empleado
          </button>
          <button className="w-full bg-gray-600 text-white py-2 rounded-lg mt-2 hover:bg-gray-500">Ver todos los empleados</button>
          <ul className="mt-4 space-y-1">
            {['Roberto', 'Roger', 'Cutz', 'Luis', 'Enrique', 'Gael', 'Fernando', 'Bruno', 'Soto'].map((name) => (
              <li key={name} className="border-b border-gray-600 py-1">{name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
