import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/carrito`;

export const obtenerCarritoApi = async (usuarioId) => {
  try {
    const res = await axios.get(`${API_URL}/${usuarioId}`);
    return res.data;
  } catch (error) {
    if (error.response?.status === 404) return { items: [], total: 0 };
    throw error;
  }
};

export const agregarItemApi = async (usuarioId, productoId, cantidad) => {
  const res = await axios.post(`${API_URL}/${usuarioId}/items`, { productoId, cantidad });
  return res.data;
};

export const actualizarCantidadApi = async (usuarioId, productoId, cantidad) => {
  const res = await axios.patch(`${API_URL}/${usuarioId}/items/${productoId}`, { cantidad });
  return res.data;
};

export const eliminarItemApi = async (usuarioId, productoId) => {
  const res = await axios.delete(`${API_URL}/${usuarioId}/items/${productoId}`);
  return res.data;
};

export const vaciarCarritoApi = async (usuarioId) => {
  const res = await axios.delete(`${API_URL}/${usuarioId}`);
  return res.data;
};
