const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

const tripList = async (req, res) => {
    const q = await Model
        .find({})
        .exec();

    if (!q) { // No data returned
        return res
            .status(404)
            .json(err);
    }
    else { // Return result
        return res
            .status(200)
            .json(q);
    }
};

const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({ 'code': req.params.code }) // Return single recodr
        .exec();

    if (!q) { // No data returned
        return res
            .status(404)
            .json(err);
    }
    else { // Return result
        return res
            .status(200)
            .json(q);
    }
}

const tripsAddTrip = async (req, res) => {
    try {
      const trip = await Model.create({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
      });
      res.send(trip);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  };
  
// FIXME: PUT method does not work
const tripsUpdateTrip = async (req, res) => {

    console.log(req.params);
    console.log(req.body);
    const q = await Model
        .findOneAndUpdate(
            { 'code': req.params.code },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        )
        .exec();

    if (!q) {
        return res
            .status(400)
            .json(err);
    }
    else {
        return res
            .status(201)
            .json(q);
    }
}


module.exports = {
    tripList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
