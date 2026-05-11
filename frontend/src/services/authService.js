import axios from 'axios';

// Asegurate de que sea el puerto correcto de tu backend
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth`; 

const loginUsuario = async (credenciales) => {
  const respuesta = await axios.post(`${API_URL}/login`, credenciales);
  return respuesta.data;
};

export { loginUsuario };