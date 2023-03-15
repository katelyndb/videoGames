const express = require('express');
const router = express.Router();
// Gets all Game Routes
router.use('/games', require('./games'));
// Gets all Individuals Routes
router.use('/individuals', require('./individuals'));
// Gets all Auth Routes
router.use('/auth', require('./auth'));
module.exports = router;