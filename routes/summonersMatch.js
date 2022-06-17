//Definimos ruta principal
const express = require('express');
const router = express.Router();
const summonerMatchController = require('../controllers/summonerMatchController');

// api/summonersmatch
router.get('/:region/:puuid', summonerMatchController.mostrarSummonerMatchs);

module.exports = router;