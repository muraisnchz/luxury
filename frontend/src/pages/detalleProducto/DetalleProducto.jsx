import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { obtenerProductoPorId } from '../../services/productoService';
import { useCart } from '../../context/CartContext';
import { getToken } from '../../utils/auth';
import CantidadModal from '../../components/cantidadModal/CantidadModal';
import './DetalleProducto.css';
import Button from '../../components/button/Button';
import Spinner from '../../components/spinner/Spinner';

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // ACTIVIDAD U6 - Punto 12: conectamos el detalle de producto con el carrito via useCart()
  const { agregarAlCarrito } = useCart();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarProducto = async () => {
      const data = await obtenerProductoPorId(id);
      setProducto(data);
      setCargando(false);
    };
    cargarProducto();
  }, [id]);

  const handleAgregarClick = () => {
    if (!getToken()) {
      navigate('/login');
      return;
    }
    setModalAbierto(true);
  };

  const handleConfirmar = async (cantidad) => {
    setModalAbierto(false);
    setError('');
    try {
      await agregarAlCarrito(producto, cantidad);
      setMensajeExito(`¡${producto.nombre} agregado al carrito!`);
      setTimeout(() => setMensajeExito(''), 3000);
    } catch (err) {
      const msg = err.response?.data?.mensaje || 'Error al agregar al carrito.';
      setError(msg);
      setTimeout(() => setError(''), 4000);
    }
  };

  if (cargando) return <Spinner color="violet" texto="Cargando detalles de la joya..." />;
  if (!producto) return <Spinner color="red" texto="Producto no encontrado." />;

  return (
    <div className="detalle-container">
      {modalAbierto && (
        <CantidadModal
          producto={producto}
          onConfirmar={handleConfirmar}
          onCancelar={() => setModalAbierto(false)}
        />
      )}

      <div className="detalle-layout">
        <div className="detalle-imagen-container">
          <img
            src={producto.imagenUrl || 'https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg'}
            alt={`Imagen de ${producto.nombre}`}
            className="detalle-imagen"
          />
        </div>

        <div className="detalle-info">
          <h1 className="detalle-titulo">{producto.nombre}</h1>
          <span className="detalle-categoria">Categoría: {producto.categoriaId?.nombre}</span>
          <p className="detalle-precio">${producto.precio}</p>

          <div className="detalle-descripcion">
            <h3>Descripción:</h3>
            <p>{producto.descripcion}</p>
          </div>

          {mensajeExito && <p className="detalle-exito">{mensajeExito}</p>}
          {error && <p className="detalle-error">{error}</p>}

          <div className="detalle-acciones">
            <div onClick={handleAgregarClick} style={{ cursor: 'pointer' }}>
              <Button texto="Agregar al Carrito" color="lila" size="grande" efecto="redondeado" />
            </div>
            <Link to="/" className="btn-volver">
              <Button texto="Volver al Catálogo" color="lila" size="grande" efecto="redondeado" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
