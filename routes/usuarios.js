//Definimos ruta principal
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// api/usuarios
router.post('/', usuarioController.crearUsuario);
router.get('/', usuarioController.mostrarUsuarios);
router.put('/:id', usuarioController.actualizarUsuario);
router.get('/:id', usuarioController.mostrarUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;