import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ _id, nombre, imagenUrl, descripcion, precio, categoriaId, onAddToCart }) => {
  return (
    <div className="product-card">
      {/* Ponemos una imagen por defecto por si alguna joya no tiene URL cargada en la BD */}
      <img 
        src={imagenUrl || 'https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg'} 
        alt={`Imagen de ${nombre}`} 
        className="product-image" 
      />
      <div className="product-info">
        <h3 className="product-title">{nombre}</h3>
        
        
        <span className="product-category">{categoriaId?.nombre}</span>
        
        <p className="product-description">{descripcion}</p>
        <span className="product-price">${precio}</span>
        
        <div className="product-actions">
          {/* Botón para ir a la vista de Detalle */}
          <Link to={`/producto/${_id}`} className="product-button detail-button">
            Ver detalle
          </Link>
          
          
        </div>
      </div>
    </div>
  );
};

export default ProductCard;