import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Para decodificar el token y obtener el rol

const API_URL = "http://localhost:8000/tours"; // La URL de la API de los tours

export default function Tours() {
  const [tours, setTours] = useState([]);
  const [userRole, setUserRole] = useState(""); // Estado para el rol del usuario
  const navigate = useNavigate();

  // Array con diferentes URLs de imágenes
  const images = [
    "https://via.placeholder.com/300x200/FF5733/FFFFFF?text=Tour+1",
    "https://via.placeholder.com/300x200/33FF57/FFFFFF?text=Tour+2",
    "https://via.placeholder.com/300x200/3357FF/FFFFFF?text=Tour+3",
    "https://via.placeholder.com/300x200/FF33A6/FFFFFF?text=Tour+4",
    "https://via.placeholder.com/300x200/FF5733/FFFFFF?text=Tour+5",
  ];

  useEffect(() => {
    // Verificar el rol del usuario
    const token = localStorage.getItem("access_token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role ? decodedToken.role.toLowerCase() : "";
      setUserRole(role);

      // Redirigir si el rol no es cliente ni administrador
      if (role !== "cliente" && role !== "administrador") {
        navigate("/rol-no-existe"); // Redirige a la página de error si el rol no es válido
      } else {
        fetchTours(); // Si el rol es válido, obtén los tours
      }
    } else {
      navigate("/"); // Si no hay token, redirigir al login
    }
  }, [navigate]);

  const fetchTours = async () => {
    const response = await axios.get(API_URL);
    setTours(response.data); // Seteamos los tours en el estado
  };

  // Función para obtener una imagen aleatoria
  const getRandomImage = () => {
    return images[Math.floor(Math.random() * images.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700/50 to-indigo-900/50 p-6">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Listado de Tours</h2>

        {/* Mostrar la lista de tours solo si el rol es "cliente" o "administrador" */}
        {userRole === "cliente" || userRole === "administrador" ? (
          <ul className="space-y-4">
            {tours.map((tour) => (
              <li key={tour.id_tour} className="flex justify-between p-4 bg-[#2d3748] text-white rounded-lg shadow-md hover:shadow-2xl transition duration-300">
                <div className="flex space-x-4">
                  {/* Imagen aleatoria */}
                  <img src={getRandomImage()} alt={tour.nombre_tour} className="w-24 h-16 object-cover rounded-lg" />
                  <div>
                    <h3 className="text-xl font-semibold">{tour.nombre_tour}</h3>
                    <p className="text-md mt-1">Descripción: {tour.descripcion_tour}</p>
                    <p className="text-md mt-1">Costo: ${tour.costo_tour}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-center">
                  <button
                    onClick={() => navigate(`/tour/${tour.id_tour}`)}  // Ruta dinámica
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-2 hover:bg-blue-700 transition duration-200"
                  >
                    Ver detalles
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-red-500 mt-4">
            No tienes acceso para ver los tours. Solo los clientes y administradores pueden acceder.
          </p>
        )}
      </div>
    </div>
  );
}
