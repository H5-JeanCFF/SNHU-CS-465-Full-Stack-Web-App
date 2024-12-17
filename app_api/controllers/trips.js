const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const User = require('../models/user');

// Function to get the user details based on the JWT token
const getUser = async (req, res, callback) => {
    if (req.auth && req.auth.email) {
        try {
            const user = await User.findOne({ email: req.auth.email }).exec();

            if (!user) {
                return res.status(404).json({ 'message': 'Email not found' });
            }
            callback(req, res, user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    } else {
        return res.status(404).json({ 'message': 'User was not found' });
    }
};

// GET: Return list of all trips
const tripList = async (req, res) => {
    try {
        const q = await Trip
            .find({})
            .exec();

        if (!q) {
            return res
                .status(404)
                .json({ 'message': 'No trips found' });
        } else {
            return res
                .status(200)
                .json(q);
        }
    } catch (err) {
        return res
            .status(500)
            .json(err);
    }
};

// GET: Return trip based on code parameter
const tripsFindByCode = async (req, res) => {
    try {
        const q = await Trip
            .findOne({ 'code': req.params.code })
            .exec();

        if (!q) {
            return res
                .status(404)
                .json({ 'message': 'Trip not found with code: ' + req.params.code });
        } else {
            return res
                .status(200)
                .json(q);
        }
    } catch (err) {
        return res
            .status(500)
            .json(err);
    }
};

// POST: Add a new trip
const tripsAddTrip = async (req, res) => {
    getUser(req, res, async () => {
        try {
            const trip = await Trip.create({
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            });
            return res
                .status(201)
                .json(trip);
        } catch (err) {
            return res
                .status(400)
                .json({ message: err.message });
        }
    });
};


// PUT: Update an existing trip by code
const tripsUpdateTrip = async (req, res) => {
    getUser(req, res, () => {
        Trip
            .findOneAndUpdate(
                { 'code': req.params.tripCode }, // Find trip by code
                {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                },
                { new: true }
            )
            .then(trip => {
                if (!trip) {
                    return res
                        .status(404)
                        .send({
                            message: 'Trip not found with code: ' + req.params.tripCode
                        });
                }
                res.send(trip);
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res
                        .status(404)
                        .send({
                            message: 'Trip not found with code: ' + req.params.tripCode
                        });
                }
                return res
                    .status(500)
                    .json(err);
            });
    });
};

module.exports = {
    tripList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};