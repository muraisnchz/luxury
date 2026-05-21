import React, { useState } from 'react';
import './CantidadModal.css';

const CantidadModal = ({ producto, onConfirmar, onCancelar }) => {
  const [cantidad, setCantidad] = useState(1);
  const stockDisponible = producto.stock || 0;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-titulo">Agregar al carrito</h2>
        <p className="modal-producto">{producto.nombre}</p>

        {stockDisponible === 0 ? (
          <>
            <p className="modal-sin-stock">Sin stock disponible para este producto.</p>
            <button className="lila grande redondeado modal-btn-accion" onClick={onCancelar}>
              Cerrar
            </button>
          </>
        ) : (
          <>
            <p className="modal-stock">Stock disponible: <strong>{stockDisponible}</strong></p>

            <div className="modal-cantidad-control">
              <button
                className="modal-btn-cantidad"
                onClick={() => setCantidad(c => Math.max(1, c - 1))}
              >−</button>
              <span className="modal-cantidad-valor">{cantidad}</span>
              <button
                className="modal-btn-cantidad"
                onClick={() => setCantidad(c => Math.min(stockDisponible, c + 1))}
              >+</button>
            </div>

            <div className="modal-acciones">
              <button className="lila grande redondeado modal-btn-accion" onClick={() => onConfirmar(cantidad)}>
                Confirmar
              </button>
              <button className="lila grande redondeado modal-btn-accion modal-btn-cancelar" onClick={onCancelar}>
                Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CantidadModal;
