const express = require('express');
const router = express.Router();
// Error Handling and Validation
const createError = require('http-errors');
const path = require('path');
const cors = require('cors');
const { signupValidation, loginValidation } = require('../validation.js');
//

const individualsController = require('../controllers/individuals');
// Gets all the individuals
router.get('/', individualsController.getAllIndividuals);
// Gets a specific individual
router.get('/:id', individualsController.getSingleIndividual);
// Creates a new individual
router.post('/', individualsController.createIndividual);
// Updates an individual by ID
router.put('/:id', individualsController.updateIndividualById);
// Deletes an individual by ID
router.delete('/:id', individualsController.deleteIndividualById);

module.exports = router;