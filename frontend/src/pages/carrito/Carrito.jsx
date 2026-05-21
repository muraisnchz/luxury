import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Carrito.css';

// ACTIVIDAD U6 - Punto Cart Page: muestra los productos del carrito con todas las acciones.
const Carrito = () => {
  const { items, cargando, actualizarCantidad, eliminarDelCarrito, vaciarCarrito, total } = useCart();
  const [cantidades, setCantidades] = useState({});
  const [notificacion, setNotificacion] = useState('');
  const [confirmarVaciar, setConfirmarVaciar] = useState(false);

  // Sincroniza el estado local del input con los items del carrito (estructura backend)
  useEffect(() => {
    const mapa = {};
    items.forEach(item => {
      const id = typeof item.productoId === 'object' ? item.productoId._id : item.productoId;
      mapa[id] = item.cantidad;
    });
    setCantidades(mapa);
  }, [items]);

  const mostrarNotificacion = (msg) => {
    setNotificacion(msg);
    setTimeout(() => setNotificacion(''), 2000);
  };

  const handleCantidadChange = (id, valor) => {
    setCantidades(prev => ({ ...prev, [id]: valor }));
  };

  const handleCantidadConfirm = (id, stockMax) => {
    const valor = parseInt(cantidades[id], 10);
    if (isNaN(valor) || valor < 1) {
      setCantidades(prev => ({ ...prev, [id]: items.find(i => (typeof i.productoId === 'object' ? i.productoId._id : i.productoId) === id)?.cantidad || 1 }));
      return;
    }
    if (valor > stockMax) {
      mostrarNotificacion(`Stock insuficiente. Máximo disponible: ${stockMax}`);
      setCantidades(prev => ({ ...prev, [id]: stockMax }));
      return;
    }
    actualizarCantidad(id, valor);
  };

  if (cargando) return <p className="carrito-mensaje">Cargando carrito...</p>;

  // ACTIVIDAD U6 - Cart Page: si está vacío, muestra mensaje y botón para volver al inicio.
  if (items.length === 0) {
    return (
      <div className="carrito-vacio">
        <p className="carrito-vacio-texto">Aún no ha agregado items al carrito.</p>
        <Link to="/">
          <button className="lila grande redondeado carrito-btn-accion">Ir al inicio</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="carrito-container">
      <h1>Mi Carrito</h1>

      {/* Modal de confirmación para vaciar el carrito */}
      {confirmarVaciar && (
        <div className="carrito-confirm-overlay">
          <div className="carrito-confirm-box">
            <p>¿Está seguro que desea vaciar el carrito?</p>
            <div className="carrito-confirm-acciones">
              <button
                className="lila grande redondeado"
                onClick={() => { vaciarCarrito(); setConfirmarVaciar(false); }}
              >Sí, vaciar</button>
              <button
                className="lila grande redondeado"
                onClick={() => setConfirmarVaciar(false)}
              >No, volver</button>
            </div>
          </div>
        </div>
      )}

      {notificacion && (
        <div className="carrito-notificacion">{notificacion}</div>
      )}

      {/* ACTIVIDAD U6 - Cart Page: tabla con todos los productos del carrito */}
      <div className="carrito-tabla-wrapper">
        <table className="carrito-tabla">
          <thead>
            <tr>
              <th>Código</th>
              <th>Descripción</th>
              <th>Cantidad</th>        {/* ACTIVIDAD U6 - Cart Page: ver cantidad + sumar/restar */}
              <th>Precio Unitario</th>
              <th>Precio Total</th>    {/* ACTIVIDAD U6 - Cart Page: subtotal por producto */}
              <th>Eliminar</th>        {/* ACTIVIDAD U6 - Cart Page: eliminar un producto */}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              // El backend devuelve productoId como objeto poblado (populate)
              const producto = item.productoId;
              const id = typeof producto === 'object' ? producto._id : producto;
              const nombre = typeof producto === 'object' ? producto.nombre : '—';
              const stockMax = typeof producto === 'object' ? producto.stock : 99;
              const valorInput = cantidades[id] ?? item.cantidad;

              return (
                <tr key={id}>
                  <td className="carrito-codigo">{String(id).slice(-6).toUpperCase()}</td>
                  <td className="carrito-descripcion">{nombre}</td>
                  <td className="carrito-cantidad">
                    <div className="carrito-cantidad-control">
                      <button
                        className="carrito-btn-cantidad"
                        onClick={() => actualizarCantidad(id, item.cantidad - 1)}
                        disabled={item.cantidad <= 1}
                      >−</button>
                      <input
                        className="carrito-input-cantidad"
                        type="number"
                        min={1}
                        max={stockMax}
                        value={valorInput}
                        onChange={(e) => handleCantidadChange(id, e.target.value)}
                        onBlur={() => handleCantidadConfirm(id, stockMax)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCantidadConfirm(id, stockMax)}
                      />
                      <button
                        className="carrito-btn-cantidad"
                        onClick={() => actualizarCantidad(id, item.cantidad + 1)}
                        disabled={item.cantidad >= stockMax}
                      >+</button>
                    </div>
                  </td>
                  <td>${item.precioUnitario.toLocaleString('es-AR')}</td>
                  <td>${(item.precioUnitario * item.cantidad).toLocaleString('es-AR')}</td>
                  <td>
                    <button
                      className="carrito-btn-eliminar"
                      onClick={() => eliminarDelCarrito(id)}
                    >✕</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="carrito-footer">
        {/* ACTIVIDAD U6 - Cart Page: total general */}
        <span className="carrito-total">Total: <strong>${total.toLocaleString('es-AR')}</strong></span>

        <div className="carrito-footer-acciones">
          {/* ACTIVIDAD U6 - Punto 6 (clearCart): vacía todo el carrito (con confirmación) */}
          <button className="lila grande redondeado" onClick={() => setConfirmarVaciar(true)}>
            Vaciar Carrito
          </button>

          <Link to="/">
            <button className="lila grande redondeado carrito-btn-accion">
              Seguir comprando
            </button>
          </Link>

          {/* Sin funcionalidad por ahora — se conectará al checkout en una próxima iteración */}
          <button className="lila grande redondeado">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
