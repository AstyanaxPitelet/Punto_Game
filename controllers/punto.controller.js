const Card = require('../models/Card')
const catchAsync = require('../helpers/catchAsync');
const path = require('path');

const cartes = catchAsync(async (req, res) => {
    try {
        const cards = await Card.find()
        res.send({cards})
    } catch(err) {

    }
})

module.exports = {
    cartes
};