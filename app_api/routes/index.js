const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');

// Load .env file
require('dotenv').config();

const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'payload'
});

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Define route for registration endpoint
router
    .route('/register')
    .post(authController.register);

// Define route for login endpoint
router
    .route('/login')
    .post(authController.login);
    
// Define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripList) // GET method
    .post(auth, tripsController.tripsAddTrip); // POST method

// GET and PUT method routes that require parameter (code)
router
    .route('/trips/:code')
    .get(tripsController.tripsFindByCode) // GET method
    .put(auth, tripsController.tripsUpdateTrip); // PUT method

module.exports = router;