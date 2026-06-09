const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  descripcion: { type: String, trim: true },
  activo: { type: Boolean, default: true } // Para baja lógica
});

const Categoria = mongoose.model('Categoria', categoriaSchema);

module.exports = {Categoria};