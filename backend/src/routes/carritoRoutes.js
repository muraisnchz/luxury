const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');

router.get('/:usuarioId', carritoController.obtenerCarrito);
router.post('/:usuarioId/items', carritoController.agregarItemAlCarrito);
router.patch('/:usuarioId/items/:productoId', carritoController.actualizarCantidadItem);
router.delete('/:usuarioId/items/:productoId', carritoController.removerItemDelCarrito);
router.delete('/:usuarioId', carritoController.vaciarCarrito);

module.exports = router;
