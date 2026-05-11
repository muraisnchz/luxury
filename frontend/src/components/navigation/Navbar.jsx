import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserRolFromToken, getToken } from '../../utils/auth'; 
import { FaUserCircle, FaSignOutAlt, FaShoppingCart, FaPlus, FaUsers } from 'react-icons/fa'; 

import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef(null); // Para cerrar el menú si clickean afuera

  const estaLogueado = !!getToken(); 
  const rol = getUserRolFromToken();
  const esAdmin = rol === 'administrador';

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    setMenuAbierto(false);
    navigate('/');
  };

  // Cerrar el menú si se hace click fuera de él
  useEffect(() => {
    const handleClickAfuera = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener('mousedown', handleClickAfuera);
    return () => document.removeEventListener('mousedown', handleClickAfuera);
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">💎 Luxury</Link>
      </div>
      
      <ul className="nav-links">
        <li><Link to="/">Inicio</Link></li>
        
        <li>
          <Link to="/carrito" title="Ver Carrito">
            <FaShoppingCart size={22} />
          </Link>
        </li>
        
        <li className="user-menu-container" ref={menuRef}>
          {estaLogueado ? (
            <>
              {/* Ícono que abre el menú */}
              <div 
                className="user-icon-trigger" 
                onClick={() => setMenuAbierto(!menuAbierto)}
              >
                <FaUserCircle size={26} />
              </div>

              {/* Menú Desplegable */}
              {menuAbierto && (
                <div className="dropdown-menu">
                  {esAdmin && (
                    <>
                      <Link to="/admin/altaProducto" onClick={() => setMenuAbierto(false)}>
                        <FaPlus className="menu-icon" /> Agregar Producto
                      </Link>
                      <Link to="/admin/usuarios" onClick={() => setMenuAbierto(false)}>
                        <FaUsers className="menu-icon" /> Usuarios
                      </Link>
                      <hr />
                    </>
                  )}
                  <button onClick={cerrarSesion} className="btn-logout-menu">
                    <FaSignOutAlt className="menu-icon" /> Cerrar Sesión
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/login" title="Iniciar Sesión">
              <FaUserCircle size={26} />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;