import React, { useState, useEffect } from 'react';
import './MiPerfil.css';
import { obtenerPerfil, actualizarPerfil, darDeBajaPerfil } from '../../services/usuarioService';
import Button from '../../components/button/Button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const MiPerfil = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    passwordActual: '',
    nuevaPassword: '',
    repetirPassword: ''
  });

  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  
  const [mostrarPasswordActual, setMostrarPasswordActual] = useState(false);
  const [mostrarNuevaPassword, setMostrarNuevaPassword] = useState(false);
  const [mostrarRepetirPassword, setMostrarRepetirPassword] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const datosUsuario = await obtenerPerfil();
        setFormData({ ...formData, nombre: datosUsuario.nombre, email: datosUsuario.email });
      } catch (error) {
        console.error("Error al cargar perfil", error);
      }
    };
    cargarDatos();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje({ tipo: '', texto: '' });

    if (formData.nuevaPassword && formData.nuevaPassword !== formData.repetirPassword) {
      setMensaje({ tipo: 'error', texto: 'Las contraseñas nuevas no coinciden.' });
      return;
    }

    if (formData.nuevaPassword && !formData.passwordActual) {
      setMensaje({ tipo: 'error', texto: 'Debes ingresar tu contraseña actual para cambiarla.' });
      return;
    }

    try {
      await actualizarPerfil(formData);
      setMensaje({ tipo: 'exito', texto: '¡Perfil actualizado correctamente!' });
      
      setFormData(prev => ({ ...prev, passwordActual: '', nuevaPassword: '', repetirPassword: '' }));
      
      setMostrarPasswordActual(false);
      setMostrarNuevaPassword(false);
      setMostrarRepetirPassword(false);
    } catch (error) {
      console.error('Error al actualizar perfil', error);
      setMensaje({ tipo: 'error', texto: 'Hubo un error al actualizar el perfil.' });
    }
  };

  const handleEliminarCuenta = async () => {
    const confirmacion = window.confirm("¿Estás seguro de que querés eliminar tu cuenta? Esta acción no se puede deshacer.");
    
    if (confirmacion) {
      try {
        await darDeBajaPerfil();
        localStorage.removeItem('token');
        window.location.href = '/'; 
      } catch (error) {
        console.error('Error al dar de baja la cuenta', error);
        setMensaje({ tipo: 'error', texto: 'Hubo un error al intentar dar de baja la cuenta.' });
      }
    }
  };
  
  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <h2>Mi Perfil</h2>
        
        {mensaje.texto && (
          <div className={`mensaje-alerta ${mensaje.tipo}`}>
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={handleSubmit} className="perfil-form">
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="divisor"></div>

          
          <div className="form-group">
            <label>Contraseña actual</label>
            <div className="password-input-wrapper">
              <input
                type={mostrarPasswordActual ? "text" : "password"}
                name="passwordActual"
                placeholder="Obligatoria para cambiar contraseña"
                value={formData.passwordActual}
                onChange={handleChange}
              />
              <button 
                type="button" 
                className="btn-mostrar-password"
                onClick={() => setMostrarPasswordActual(!mostrarPasswordActual)}
              >
                {mostrarPasswordActual ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          
          <div className="form-group">
            <label>Nueva contraseña</label>
            <div className="password-input-wrapper">
              <input
                type={mostrarNuevaPassword ? "text" : "password"}
                name="nuevaPassword"
                placeholder="Dejar en blanco para no cambiarla"
                value={formData.nuevaPassword}
                onChange={handleChange}
              />
              <button 
                type="button" 
                className="btn-mostrar-password"
                onClick={() => setMostrarNuevaPassword(!mostrarNuevaPassword)}
              >
                {mostrarNuevaPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          
          <div className="form-group">
            <label>Repetir nueva contraseña</label>
            <div className="password-input-wrapper">
              <input
                type={mostrarRepetirPassword ? "text" : "password"}
                name="repetirPassword"
                placeholder="Repetí la nueva contraseña"
                value={formData.repetirPassword}
                onChange={handleChange}
              />
              <button 
                type="button" 
                className="btn-mostrar-password"
                onClick={() => setMostrarRepetirPassword(!mostrarRepetirPassword)}
              >
                {mostrarRepetirPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <Button type="submit" texto="Guardar cambios" color="lila" size="grande" efecto="redondeado" />
          <Button type="button" texto="Eliminar cuenta" color="rojo" size="grande" efecto="redondeado" onClick={handleEliminarCuenta} />
        
        </form>
      </div>
    </div>
  );
};

export default MiPerfil;