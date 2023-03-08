const express = require('express');
const router = express.Router();
// Gets all Game Data
router.use('/games', require('./games'));
// Gets all Individuals Data
router.use('/individuals', require('./individuals'));

module.exports = router;