const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// Define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripList) // GET method
    .post(tripsController.tripsAddTrip); // POST method

// GET and PUT method routes that require parameter (code)
router
    .route('/trips/:code')
    .get(tripsController.tripsFindByCode) // GET method
    .put(tripsController.tripsUpdateTrip); // PUT method

module.exports = router;