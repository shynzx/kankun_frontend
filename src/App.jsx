import React from 'react'
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom'

<<<<<<< HEAD
import './index.css'

import Login from "./pages/login"
import CrearTour from './pages/CrearTour'
=======
import Login from './pages/login'
import Registro from './pages/registro'
import Dashboard from './pages/proteted/dashboard'
>>>>>>> a860889b3e13823b9af4c44077878583478f24ab


const App = () => {
  return (
<<<<<<< HEAD
    <>
    <CrearTour></CrearTour>
    </>
   
=======
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} /> 
      </Routes>
    </BrowserRouter>
>>>>>>> a860889b3e13823b9af4c44077878583478f24ab
  )
}

export default App