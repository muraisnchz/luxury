import axios from 'axios';
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/productos`;

export const obtenerProductos = async () => {
  const respuesta = await axios.get(API_URL);
  return respuesta.data;
};

export const obtenerProductoPorId = async (id) => {
  const respuesta = await axios.get(`${API_URL}/${id}`);
  return respuesta.data;
};