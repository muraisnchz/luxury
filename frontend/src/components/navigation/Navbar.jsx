<<<<<<< HEAD
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserRolFromToken, getToken } from '../../utils/auth';
import { FaUserCircle, FaSignOutAlt, FaShoppingCart, FaPlus, FaUsers } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
=======
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // 1. IMPORTAMOS useLocation
import { getUserRolFromToken, getToken } from "../../utils/auth";
import { FaUserCircle, FaSignOutAlt, FaShoppingCart, FaPlus, FaUsers, FaUser } from "react-icons/fa";
>>>>>>> upstream/main

import "./Navbar.css";
import "./Navbar.css";

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
<<<<<<< HEAD
  const menuRef = useRef(null);
  const { cantidadTotal } = useCart();

=======
  const menuRef = useRef(null); 
  
  // 2. MAGIA: Al declarar location, forzamos al Navbar a actualizarse en cada cambio de ruta
  const location = useLocation(); 

  // Como el Navbar se actualiza, ahora lee el token correctamente después de loguearte
>>>>>>> upstream/main
  const estaLogueado = !!getToken();
  const rol = getUserRolFromToken();
  const esAdmin = rol === "administrador";
  const esAdmin = rol === "administrador";

  const cerrarSesion = () => {
<<<<<<< HEAD
    localStorage.removeItem("token");
    window.dispatchEvent(new Event('authChange'));
=======
    localStorage.removeItem("token");
>>>>>>> upstream/main
    setMenuAbierto(false);
    window.location.href = "/"; 
    window.location.href = "/"; 
  };

  useEffect(() => {
    const handleClickAfuera = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickAfuera);
    return () => document.removeEventListener("mousedown", handleClickAfuera);
    document.addEventListener("mousedown", handleClickAfuera);
    return () => document.removeEventListener("mousedown", handleClickAfuera);
  }, []);

 
 
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">💎 Luxury</Link>
      </div>


      <ul className="nav-links">
<<<<<<< HEAD
        <li>
          <Link to="/">Inicio</Link>
        </li>

        <li className="carrito-nav-item">
=======
        <li>
          <Link to="/">Inicio</Link>
</li>

        <li>
>>>>>>> upstream/main
          <Link to="/carrito" title="Ver Carrito">
            <FaShoppingCart size={22} />
            {cantidadTotal > 0 && (
              <span className="carrito-badge">{cantidadTotal}</span>
            )}
          </Link>
        </li>


        <li className="user-menu-container" ref={menuRef}>
          {estaLogueado ? (
            <>
              <div
                className="user-icon-trigger"
              <div
                className="user-icon-trigger"
                onClick={() => setMenuAbierto(!menuAbierto)}
              >
                <FaUserCircle size={26} />
              </div>

              {menuAbierto && (
                <div className="dropdown-menu">
                  
                  <Link to="/mi-Perfil" onClick={() => setMenuAbierto(false)}>
                    <FaUser className="menu-icon" /> Mi Perfil
                  </Link>
                  
                  <Link to="/mi-Perfil" onClick={() => setMenuAbierto(false)}>
                    <FaUser className="menu-icon" /> Mi Perfil
                  </Link>
                  {esAdmin && (
                    <>
                      <Link
                       
                        to="/admin/altaProducto"
                       
                        onClick={() => setMenuAbierto(false)}
                      
                      >
                        <FaPlus className="menu-icon" /> Agregar Producto
                      </Link>
                      <Link
                       
                        to="/admin/usuarios"
                       
                        onClick={() => setMenuAbierto(false)}
                      
                      >
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
