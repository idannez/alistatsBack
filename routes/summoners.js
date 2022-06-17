//Definimos ruta principal
const express = require('express');
const router = express.Router();
const summonerController = require('../controllers/summonerController');

// api/summoners
router.get('/:name', summonerController.mostrarSummoner);

module.exports = router;