const { Usuario } = require('../models/usuario');
const {Carrito} = require('../models/carrito');

// Alta
const crearUsuario = async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();

    // Le creamos un carrito automáticamente al registrarse
    const nuevoCarrito = new Carrito({ usuarioId: nuevoUsuario._id, items: [], total: 0 });
    await nuevoCarrito.save();

    res.status(201).json({ mensaje: 'Usuario creado', usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear usuario', error: error.message });
  }
};

// Consultas
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find(); // El admin vería todos
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error: error.message });
  }
};

const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuario', error: error.message });
  }
};

// Modificación
const modificarUsuario = async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ mensaje: 'Usuario actualizado', usuario: usuarioActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar usuario', error: error.message });
  }
};

// Baja Lógica
const bajaLogicaUsuario = async (req, res) => {
  try {
    const usuarioBaja = await Usuario.findByIdAndUpdate(req.params.id, { activo: false }, { new: true });
    res.status(200).json({ mensaje: 'Usuario dado de baja exitosamente', usuario: usuarioBaja });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al dar de baja al usuario', error: error.message });
  }
};

module.exports = { crearUsuario, obtenerUsuarios, obtenerUsuarioPorId, modificarUsuario, bajaLogicaUsuario };