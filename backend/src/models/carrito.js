const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true, unique: true },
  items: [{
    productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    cantidad: { type: Number, required: true, min: 1 },
    precioUnitario: { type: Number, required: true }
  }],
  total: { type: Number, default: 0 }
});

const Carrito = mongoose.model('Carrito', carritoSchema);

module.exports = {Carrito};


