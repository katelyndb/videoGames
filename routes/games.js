const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/games');
// Gets all the games
router.get('/', gamesController.getAllGames);
// Gets a specific games
router.get('/:id', gamesController.getSingleGame);
// Creates a new game
router.post('/', gamesController.createGame);

module.exports = router;