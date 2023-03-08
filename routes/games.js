const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/games');
// Gets all the games
router.get('/', gamesController.getAllGames);
// Gets a specific games
router.get('/:id', gamesController.getSingleGame);

module.exports = router;