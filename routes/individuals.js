const express = require('express');
const router = express.Router();

const individualsController = require('../controllers/individuals');
// Gets all the contacts
router.get('/', individualsController.getAllIndividuals);

module.exports = router;