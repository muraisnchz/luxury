const API_URL = 'http://localhost:3000/api/productos';

export const obtenerProductos = async () => {
  try {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) throw new Error('Error al obtener el catálogo');
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const obtenerProductoPorId = async (id) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`);
    if (!respuesta.ok) throw new Error('Error al obtener el producto');
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};