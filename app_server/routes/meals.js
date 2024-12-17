var express = require('express');
var router = express.Router();
const controller = require('../controllers/meals');

// Get meals page.
router.get('/', controller.meals);

module.exports = router;
