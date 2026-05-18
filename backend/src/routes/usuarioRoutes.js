const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');


// Crear un usuario (Registro)
router.post('/', usuarioController.crearUsuario);

// Obtener todos los usuarios (solo para administradores)
router.get('/',authMiddleware, adminMiddleware , usuarioController.obtenerUsuarios);

// Obtener perfil del usuario logueado
router.get('/perfil', authMiddleware, usuarioController.obtenerPerfil);

// Actualizar datos del usuario logueado
router.put('/perfil', authMiddleware, usuarioController.actualizarPerfil);

// Baja lógica del usuario logueado
router.patch('/perfil', authMiddleware, usuarioController.bajaLogicaUsuario);

// Obtener un usuario por su ID
router.get('/:id', usuarioController.obtenerUsuarioPorId);

//Modificar un usuario desde el panel de admin
router.put('/:id', authMiddleware, adminMiddleware, usuarioController.actualizarUsuario);

// Eliminar un usuario definitivamente desde el panel de admin
router.delete('/:id', authMiddleware, adminMiddleware, usuarioController.eliminarUsuario);



module.exports = router;