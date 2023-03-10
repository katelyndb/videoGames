const express = require('express');
const router = express.Router();
// Error Handling and Validation
const createError = require('http-errors');
const path = require('path');
const cors = require('cors');
const { signupValidation, loginValidation } = require('../validation.js');
//

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

/*
  app.post('/register', signupValidation, (req, res, next) => {
    // your registration code
 });
  
  
 app.post('/login', loginValidation, (req, res, next) => {
    // your login code
 });
  
 // Handling Errors
 app.use((err, req, res, next) => {
     // console.log(err);
     err.statusCode = err.statusCode || 500;
     err.message = err.message || "Internal Server Error";
     res.status(err.statusCode).json({
       message: err.message,
     });
 });

 */