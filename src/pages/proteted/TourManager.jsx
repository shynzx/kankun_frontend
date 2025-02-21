import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8000/tours";

export default function TourManager() {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [form, setForm] = useState({
    nombre_tour: "",
    descripcion_tour: "",
    costo_tour: 0,
    dias_tour: 0,
    tipo_tour: "",
    maxpersonas_tour: 0,
    direccion_inicio_tour: "",
    direccion_destino_tour: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  // Verificar el rol del usuario
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

  const fetchTours = async () => {
    const response = await axios.get(API_URL);
    setTours(response.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, form);
    } else {
      await axios.post(API_URL, form);
    }
    setEditingId(null);
    setForm({
      nombre_tour: "",
      descripcion_tour: "",
      costo_tour: 0,
      dias_tour: 0,
      tipo_tour: "",
      maxpersonas_tour: 0,
      direccion_inicio_tour: "",
      direccion_destino_tour: "",
    });
    fetchTours();
  };

  const handleEdit = (tour) => {
    setForm(tour);
    setEditingId(tour.id_tour);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTours();
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("correo_usuario");
    navigate("/");
  };

  // Navbar
  const Navbar = () => {
    return (
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
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700/50 to-indigo-900/50 p-6">
      <Navbar /> {/* Agregando el Navbar aquí */}
      
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Gestión de Tours</h2>

        <form onSubmit={handleSubmit} className="bg-violet-950/95 border border-gray-800 p-8 rounded-2xl shadow-xl w-96 mt-10">
          <div className="mb-4">
            <label htmlFor="nombre_tour" className="text-white font-semibold">Nombre del Tour</label>
            <input
              id="nombre_tour"
              name="nombre_tour"
              value={form.nombre_tour}
              onChange={handleChange}
              placeholder="Nombre del Tour"
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-200 mb-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="descripcion_tour" className="text-white font-semibold">Descripción</label>
            <input
              id="descripcion_tour"
              name="descripcion_tour"
              value={form.descripcion_tour}
              onChange={handleChange}
              placeholder="Descripción"
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-200 mb-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="costo_tour" className="text-white font-semibold">Costo</label>
            <input
              id="costo_tour"
              type="number"
              name="costo_tour"
              value={form.costo_tour}
              onChange={handleChange}
              placeholder="Costo"
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-200 mb-2"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-800/90 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {editingId ? "Actualizar" : "Crear"} Tour
          </button>
        </form>

        <h3 className="text-xl font-bold text-white mt-6 mb-2">Listado de Tours</h3>
        <ul className="bg-blue-950/90 p-4 rounded-lg shadow-md">
          {tours.map((tour) => (
            <li key={tour.id_tour} className="flex justify-between p-2 border-b border-gray-600">
              <span className="text-white">{tour.nombre_tour} - ${tour.costo_tour}</span>
              <div>
                <button
                  onClick={() => handleEdit(tour)}
                  className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(tour.id_tour)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
