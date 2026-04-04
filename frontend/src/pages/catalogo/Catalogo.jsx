import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/productCard/ProductCard';
import { obtenerProductos } from '../../services/productoService';

import './Catalogo.css';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarCatalogo = async () => {
      const data = await obtenerProductos();
      setProductos(data);
      setCargando(false);
    };
    cargarCatalogo();
  }, []);

  if (cargando) return <h2>Cargando el catálogo de joyas...</h2>;

  return (
    <div className="catalogo-container">
      <h1>Catálogo de Joyas</h1>
      <div className="catalogo-grid">
        {productos.map((producto) => (
          <ProductCard 
            key={producto._id}
            _id={producto._id}
            nombre={producto.nombre}
            imagenUrl={producto.imagenUrl}
            descripcion={producto.descripcion}
            precio={producto.precio}
            categoriaId={producto.categoriaId}
            onAddToCart={() => console.log(`Agregando ${producto.nombre} al carrito (Próximamente)`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Catalogo;