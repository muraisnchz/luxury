import React, { useEffect, useState } from 'react';
import { getUsuarios } from '../../services/usuarioService';
import '../altaProducto/AltaProducto.css'; // Reutilizamos estilos para mantener coherencia

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const data = await getUsuarios();
        setUsuarios(data);
      } catch (err) {
        setError('No se pudo cargar la lista de usuarios.');
        console.error(err);
      } finally {
        setCargando(false);
      }
    };
    cargarUsuarios();
  }, []);

  if (cargando) return <div className="form-container"><h3>Cargando usuarios...</h3></div>;

  return (
    <div className="form-container" style={{ maxWidth: '800px' }}>
      <h2>Gestión de Usuarios</h2>
      
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <table className="tabla-usuarios" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#5a189a', color: 'white' }}>
            <th style={{ padding: '12px' }}>Nombre</th>
            <th style={{ padding: '12px' }}>Email</th>
            <th style={{ padding: '12px' }}>Rol</th>
            <th style={{ padding: '12px' }}>Estado</th> 
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u._id} style={{ borderBottom: '1px solid #ddd', textAlign: 'center' }}>
              <td style={{ padding: '10px' }}>{u.nombre}</td>
              <td style={{ padding: '10px' }}>{u.email}</td>
              <td style={{ padding: '10px' }}>
                <span style={{ 
                  backgroundColor: u.rol === 'administrador' ? '#ffd700' : '#e0e0e0',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  fontWeight: 'bold'
                }}>
                  {u.rol}
                </span>
              </td>
              <td style={{ padding: '10px' }}>
                <span style={{ 
                  backgroundColor: u.activo ? '#4caf50' : '#f44336',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  fontWeight: 'bold'
                }}>
                  {u.activo ? 'Activo' : 'Inactivo'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;