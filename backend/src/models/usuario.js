const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Sub-schema reutilizable para dirección (facturación y entrega)
const direccionSchema = new mongoose.Schema({
  calle:  { type: String, trim: true },
  nro:    { type: String, trim: true },
  piso:   { type: String, trim: true },
  depto:  { type: String, trim: true }
}, { _id: false });

const usuarioSchema = new mongoose.Schema({
  nombre:   { type: String, required: true, trim: true },
  apellido: { type: String, trim: true },               // Agregado para facturación
  email:    { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  dni:      { type: String, trim: true },               // Agregado para facturación
  direccionFacturacion: { type: direccionSchema },       // Dirección legal del usuario
  direccionEntrega:     { type: direccionSchema },       // Puede diferir (ej: trabajo)
  rol:    { type: String, enum: ['cliente', 'administrador'], default: 'cliente' },
  activo: { type: Boolean, default: true }
});

// ==========================================
// Hook: Antes de guardar ('pre save')
// ==========================================
usuarioSchema.pre('save', async function() {
  // 'this' hace referencia al documento del usuario
  
  // Si la contraseña no fue modificada, simplemente retornamos para salir
  if (!this.isModified('password')) {
    return;
  }

  // Generamos el salt y hasheamos (Mongoose atrapará cualquier error automáticamente)
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  

});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = {Usuario};