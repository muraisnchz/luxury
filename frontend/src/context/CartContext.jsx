import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserIdFromToken, getToken } from '../utils/auth';
import {
  obtenerCarritoApi,
  agregarItemApi,
  actualizarCantidadApi,
  eliminarItemApi,
  vaciarCarritoApi,
} from '../services/carritoService';

// ACTIVIDAD U6 - Punto 1: Creamos el contexto base del carrito (el "canal" compartido de React)
const CartContext = createContext();

// ACTIVIDAD U6 - Punto 2: CartProvider guarda toda la lógica del carrito.
// El carrito persiste en la base de datos (MongoDB), asociado al usuario logueado.
// Esto permite que el carrito esté disponible desde cualquier dispositivo.
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [usuarioId, setUsuarioId] = useState(() => getToken() ? getUserIdFromToken() : null);

  // Actualiza usuarioId cuando cambia la sesión (login / logout)
  useEffect(() => {
    const handleAuthChange = () => {
      setUsuarioId(getToken() ? getUserIdFromToken() : null);
    };
    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  // Carga el carrito del usuario desde la API al iniciar (o cuando cambia la sesion)
  useEffect(() => {
    const cargarCarrito = async () => {
      if (!usuarioId) {
        setItems([]);
        return;
      }
      setCargando(true);
      try {
        const data = await obtenerCarritoApi(usuarioId);
        setItems(data.items || []);
      } catch {
        setItems([]);
      } finally {
        setCargando(false);
      }
    };
    cargarCarrito();
  }, [usuarioId]);

  // Re-fetchea el carrito con populate para obtener los datos completos del producto
  const refrescarCarrito = async () => {
    const data = await obtenerCarritoApi(usuarioId);
    setItems(data.items || []);
  };

  // ACTIVIDAD U6 - Punto 4 (addToCart): agrega un producto. Si ya existe, suma la cantidad.
  const agregarAlCarrito = async (producto, cantidad) => {
    await agregarItemApi(usuarioId, producto._id, cantidad);
    await refrescarCarrito();
  };

  // Actualiza la cantidad de un item (usado desde la Cart Page con +/- o input directo)
  const actualizarCantidad = async (productoId, cantidad) => {
    await actualizarCantidadApi(usuarioId, productoId, cantidad);
    await refrescarCarrito();
  };

  // ACTIVIDAD U6 - Punto 5 (removeFromCart): elimina completamente un producto del carrito.
  const eliminarDelCarrito = async (productoId) => {
    await eliminarItemApi(usuarioId, productoId);
    await refrescarCarrito();
  };

  // ACTIVIDAD U6 - Punto 6 (clearCart): vacía todo el carrito.
  const vaciarCarrito = async () => {
    await vaciarCarritoApi(usuarioId);
    setItems([]);
  };

  // ACTIVIDAD U6 - Punto 7 (cartQuantity): cantidad total de unidades en el carrito.
  const cantidadTotal = items.reduce((acc, item) => acc + item.cantidad, 0);

  // ACTIVIDAD U6 - Punto 8 (cartTotal): importe total del carrito.
  const total = items.reduce((acc, item) => acc + item.cantidad * item.precioUnitario, 0);

  return (
    // ACTIVIDAD U6 - Punto 2: el Provider expone los datos y funciones a toda la app.
    <CartContext.Provider value={{ items, cargando, agregarAlCarrito, actualizarCantidad, eliminarDelCarrito, vaciarCarrito, cantidadTotal, total }}>
      {children}
    </CartContext.Provider>
  );
};

// ACTIVIDAD U6 - Punto 9 (useCart): hook personalizado para consumir el contexto.
// Cualquier componente puede hacer: const { agregarAlCarrito } = useCart()
export const useCart = () => useContext(CartContext);
