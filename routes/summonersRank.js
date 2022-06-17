//Definimos ruta principal
const express = require('express');
const router = express.Router();
const summonerRankController = require('../controllers/summonerRankController');

// api/summonersrank
router.get('/:platform/:summonerId', summonerRankController.mostrarSummonerRank);

module.exports = router;