const mongoose = require('mongoose');

const ordenCompraSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  
  items: [{
    productoId: { type: mongoose.Schema.Types.ObjectId }, 
    nombre: { type: String, required: true },            
    cantidad: { type: Number, required: true },
    precioUnitario: { type: Number, required: true }
  }],
  
  total: { type: Number, required: true },
  fechaCreacion: { type: Date, default: Date.now }
});

const OrdenCompra = mongoose.model('OrdenCompra', ordenCompraSchema);

module.exports = {OrdenCompra};
