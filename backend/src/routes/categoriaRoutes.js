const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// Crear una nueva categoría
router.post('/', categoriaController.crearCategoria);

// Obtener todas las categorías activas
router.get('/', categoriaController.obtenerCategorias);

// Modificar una categoría
router.put('/:id', categoriaController.modificarCategoria);

// Baja lógica de una categoría
router.patch('/:id/baja', categoriaController.bajaLogicaCategoria);

module.exports = router;