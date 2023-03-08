const express = require('express');
const router = express.Router();

const individualsController = require('../controllers/individuals');
// Gets all the individuals
router.get('/', individualsController.getAllIndividuals);
// Gets a specific individual
router.get('/:id', individualsController.getSingleIndividual);
// Creates a new individual
router.post('/', individualsController.createIndividual);

module.exports = router;