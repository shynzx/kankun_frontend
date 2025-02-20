import React from 'react'
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom'

import Login from './pages/login'
import Registro from './pages/registro'
import Dashboard from './pages/proteted/dashboard'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App