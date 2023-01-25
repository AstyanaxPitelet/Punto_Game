const Card = require('../models/Card')
const catchAsync = require('../helpers/catchAsync');
const path = require('path');

const cartes = catchAsync(async (req, res) => {
    const cartes = await Card.find()
    res.send({
        title: 'Liste des cartes',
        cards: cartes
    })
})

module.exports = {
    cartes
};