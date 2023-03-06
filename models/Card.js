const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    numero: {type: Number},
    color: {type: String},
    img: {type: String}
})

module.exports = mongoose.model('card', cardSchema)