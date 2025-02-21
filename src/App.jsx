import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Registro from "./pages/registro";
import Dashboard from "./pages/proteted/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import TourManager from "./pages/proteted/TourManager";
import RoleNotFound from "./pages/rol-no-existe"; 
import PageNotFound from './pages/PageNotFound'; 
import Tours from './pages/proteted/tours' 
import TourDetails from "./pages/proteted/TourDetails"; // Importa el nuevo componente// Nueva vista para roles no existentes

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* 🔒 Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/creartour" element={<TourManager />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tour/:id_tour" element={<TourDetails />} /> {/* Nueva ruta */}
        </Route>

        {/* Ruta para roles no existentes */}
        <Route path="/rol-no-existe" element={<RoleNotFound />} />

        <Route path="*" element={<PageNotFound />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default App;
