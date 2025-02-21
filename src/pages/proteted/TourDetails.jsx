import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8000/tours";

export default function TourDetails() {
  const { id_tour } = useParams(); // Obtenemos el id del tour desde la URL
  const [tour, setTour] = useState(null);

  useEffect(() => {
    // Obtener los detalles del tour
    const fetchTour = async () => {
      const response = await axios.get(`${API_URL}/${id_tour}`);
      setTour(response.data);
    };

    fetchTour();
  }, [id_tour]);

  if (!tour) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700/50 to-indigo-900/50 p-6">
      <div className="container mx-auto p-4">
        <button
          onClick={() => window.history.back()} // Usamos window.history.back() para regresar
          className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-4"
        >
          Regresar
        </button>

        <div className="bg-[#2d3748] p-6 rounded-lg shadow-lg mt-6 text-white">
          <h2 className="text-3xl font-bold">{tour.nombre_tour}</h2>
          <img
            src="https://via.placeholder.com/800x400"
            alt={tour.nombre_tour}
            className="w-full h-64 object-cover rounded-lg mt-4"
          />
          <p className="mt-4">{tour.descripcion_tour}</p>
          <p className="mt-2 text-xl font-semibold">Costo: ${tour.costo_tour}</p>
          <p className="mt-2">Duración: {tour.dias_tour} días</p>
          <p className="mt-2">Ubicación: {tour.direccion_inicio_tour} - {tour.direccion_destino_tour}</p>
        </div>
      </div>
    </div>
  );
}
