import React from 'react';
import { Navigate } from 'react-router-dom';
// Importamos tu utilidad
import { getUserRolFromToken, getToken } from '../../utils/auth';

const AdminRoute = ({ children }) => {
  const token = getToken();

  // 1. Si no hay token, al login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // 2. Usamos tu función mágica
  const rol = getUserRolFromToken();
  
  // 3. Chequeamos si es el jefe
  if (rol === 'administrador') {
    return children;
  } else {
    // Si no es admin (o el token era inválido y devolvió null), lo mandamos al inicio
    return <Navigate to="/" />;
  }
};

export default AdminRoute;