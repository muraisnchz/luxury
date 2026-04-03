const mongoose =  require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true, min: 0 },
  categoriaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true }, // Referencia
  stock: { type: Number, required: true, min: 0 }, // Control básico de stock
  imagenUrl: { type: String },
  activo: { type: Boolean, default: true } // Para baja lógica
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = {Producto};
