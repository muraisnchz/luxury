import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AdminRoute from './components/adminRoute/AdminRoute'; 
import Navbar from './components/navigation/Navbar';
import Footer from './components/footer/Footer';


import Catalogo from './pages/catalogo/Catalogo';
import DetalleProducto from './pages/detalleProducto/DetalleProducto';
import AltaProducto from './pages/altaProducto/AltaProducto';
import Login from './pages/login/Login';
import Registro from './pages/registro/Registro';
import Usuarios from './pages/usuarios/Usuarios';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        
        
        <Navbar brandName="Luxury" />

        <Routes>
          <Route path="/" element={<Catalogo />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          <Route 
            path="/admin/altaProducto" 
            element={
              <AdminRoute>
                <AltaProducto />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/usuarios" 
            element={
              <AdminRoute>
                <Usuarios />
              </AdminRoute>
            } 
          />
        </Routes>

        <Footer year={new Date().getFullYear()} companyName="Luxury" />

      </div>
    </BrowserRouter>
  );
}

export default App;