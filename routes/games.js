const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/games');
// Gets all the contacts
router.get('/', gamesController.getAllGames);

module.exports = router;