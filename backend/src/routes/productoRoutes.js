const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Crear un nuevo producto (Joya)
router.post('/', productoController.crearProducto);

// Obtener el catálogo de productos activos
router.get('/', productoController.obtenerProductosActivos);

// Obtener el detalle de un producto específico
router.get('/:id', productoController.obtenerProductoPorId);

// Modificar un producto
router.put('/:id', productoController.modificarProducto);

// Baja lógica de un producto (Retirarlo del catálogo)
router.patch('/:id/baja', productoController.bajaLogicaProducto);

module.exports = router;