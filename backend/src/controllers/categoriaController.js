const { Categoria } = require('../models/categoria');

const crearCategoria = async (req, res) => {
  try {
    const nuevaCategoria = new Categoria(req.body);
    await nuevaCategoria.save();
    res.status(201).json({ mensaje: 'Categoría creada', categoria: nuevaCategoria });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear categoría', error: error.message });
  }
};

const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find({ activo: true });
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener categorías', error: error.message });
  }
};

const modificarCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ mensaje: 'Categoría actualizada', categoria });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al modificar categoría', error: error.message });
  }
};

const bajaLogicaCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndUpdate(req.params.id, { activo: false }, { new: true });
    res.status(200).json({ mensaje: 'Categoría dada de baja', categoria });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al dar de baja la categoría', error: error.message });
  }
};

module.exports = { crearCategoria, obtenerCategorias, modificarCategoria, bajaLogicaCategoria };