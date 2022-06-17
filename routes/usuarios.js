//Definimos ruta principal
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// api/usuarios


router.get('/', usuarioController.mostrarUsuarios);
router.get('/:id', usuarioController.mostrarUsuario);
router.get('/puuid/:id', usuarioController.mostrarUsuarioPorPUUID);
router.get('/sname/:summonerName', usuarioController.mostrarUsuarioPorSummonerName);
router.get('/email/:email', usuarioController.mostrarUsuarioPorEmail);
router.get('/uname/:uname', usuarioController.mostrarUsuarioPorUserName);

router.post('/', usuarioController.crearUsuario);
router.post('/login', usuarioController.login);
router.post('/verifyLogin', usuarioController.verifyLogin);

router.put('/:id', usuarioController.actualizarUsuario);

router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;