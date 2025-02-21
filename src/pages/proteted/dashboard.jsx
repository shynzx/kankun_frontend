import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const API_URL = "http://localhost:8000/tours"; // URL de la API de tours

function Dashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [tours, setTours] = useState([]); // Para almacenar los tours

  // Obtener tours desde la API
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role ? decodedToken.role.toLowerCase() : "";
      setUserRole(role);
      if (role !== "administrador") {
        navigate("/rol-no-existe");
      }
    } else {
      navigate("/");
    }

    const email = localStorage.getItem("correo_usuario");
    if (email) {
      setUserEmail(email);
    }
    fetchTours();
  }, [navigate]);

  // Función para obtener los tours
  const fetchTours = async () => {
    const response = await axios.get(API_URL);
    setTours(response.data);
  };

  // Generar las estadísticas para la gráfica de reservas (con datos aleatorios)
  const tourStats = tours.map((tour) => ({
    name: tour.nombre_tour, // Nombre del tour
    reservas: Math.floor(Math.random() * 50) + 1, // Generar un número aleatorio entre 1 y 50
  }));

  // Crear las estadísticas para la gráfica de precio mayor
  const priceStats = tours
    .map((tour) => ({
      name: tour.nombre_tour,
      precio: tour.costo_tour, // Precio del tour
    }))
    .sort((a, b) => b.precio - a.precio); // Ordenar de mayor a menor precio

  // Calcular el total de ingresos
  const totalIngresos = tours.reduce((acc, tour) => acc + tour.costo_tour, 0);

  // Total de tours creados
  const totalTours = tours.length;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("correo_usuario");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700/50 to-indigo-900/50 p-6">
      {/* Navbar */}
      <div className="bg-violet-950/95 text-white flex justify-between items-center p-4 rounded-md border border-gray-800">
        <h1 className="text-xl font-bold">KANKUN</h1>
        <div className="flex space-x-6">
          <button onClick={() => navigate("/dashboard")} className="hover:underline">Panel de Control</button>
          <button onClick={() => navigate("/creartour")} className="hover:underline">Crear Tour</button>
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-semibold">Bienvenido {userEmail || "Usuario"}</span>
          <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded-md hover:bg-red-700">Cerrar Sesión</button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Gráfica de Tours más Reservados */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-600 text-white">
          <h2 className="text-center font-bold">Tours más reservados</h2>
          <div className="mt-4 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tourStats}>
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="reservas" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfica de Tours con el Precio Mayor */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-600 text-white">
          <h2 className="text-center font-bold">Tours por Precio Mayor</h2>
          <div className="mt-4 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceStats}>
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="precio" fill="#E11D48" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Estadísticas generales */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-600 text-white">
          <h2 className="text-center font-bold">Estadísticas</h2>
          <ul className="mt-4 space-y-2">
            <li className="flex justify-between"><span>Total de Tours</span><span className="font-bold">{totalTours}</span></li>
            <li className="flex justify-between"><span>Total de reservas</span><span className="font-bold">30</span></li>
            <li className="flex justify-between"><span>Total de ingresos</span><span className="font-bold">${totalIngresos.toFixed(2)}</span></li>
          </ul>
        </div>

        {/* Botón para agregar empleados */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-600 text-white">
          <h2 className="text-center font-bold">Empleados</h2>
          <button 
            onClick={() => navigate("/registro")}
            className="w-full bg-gray-700 py-2 rounded-lg mt-4 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            + Agregar Empleado
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
