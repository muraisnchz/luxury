const express = require('express');
const router = express.Router();
const ordenCompraController = require('../controllers/ordenCompraController');

// Generar una nueva orden de compra a partir del carrito del usuario (Checkout)
router.post('/:usuarioId', ordenCompraController.generarOrden);

// Obtener el historial de compras de un usuario específico
router.get('/usuario/:usuarioId', ordenCompraController.obtenerOrdenesPorUsuario);

// Obtener todas las órdenes de la tienda (Para el panel del Administrador)
router.get('/', ordenCompraController.obtenerTodasLasOrdenes);

module.exports = router;