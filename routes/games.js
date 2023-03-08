const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/games');
// Gets all the games
router.get('/', gamesController.getAllGames);
// Gets a specific games
router.get('/:id', gamesController.getSingleGame);
// Creates a new game
router.post('/', gamesController.createGame);
// Updates a game by ID
router.put('/:id', gamesController.updateGameById);
// Deletes a game by ID
router.delete('/:id', gamesController.deleteGameById);

module.exports = router;