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

module.exports = {
    tripList,
    tripsFindByCode
};
