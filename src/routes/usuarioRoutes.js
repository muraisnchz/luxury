const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Crear un usuario (Registro)
router.post('/', usuarioController.crearUsuario);

// Obtener todos los usuarios (Ideal para el Administrador)
router.get('/', usuarioController.obtenerUsuarios);

// Obtener un usuario por su ID
router.get('/:id', usuarioController.obtenerUsuarioPorId);

// Modificar datos del usuario
router.put('/:id', usuarioController.modificarUsuario);

// Baja lógica del usuario
router.patch('/:id/baja', usuarioController.bajaLogicaUsuario);

module.exports = router;