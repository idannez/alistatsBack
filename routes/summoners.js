//Definimos ruta principal
const express = require('express');
const router = express.Router();
const summonerController = require('../controllers/summonerController');

// api/summonersMatch
router.get('/:platform/:name', summonerController.mostrarSummoner);

module.exports = router;