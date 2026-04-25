import React from 'react';
import './Spinner.css';

// Le damos valores por defecto por si te olvidas de pasarlos (ej. gold y 'Cargando...')
const Spinner = ({ color = 'gold', texto = 'Cargando...' }) => {
  return (
    <div className="spinner-container">
      <div 
        className="spinner" 
        style={{ borderTopColor: color }} /* Aquí inyectamos el color que pidas */
      ></div>
      <p>{texto}</p>
    </div>
  );
};

export default Spinner;