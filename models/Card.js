const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    nombre: {type: Number},
    color: {type: String},
    img: {type: String}
})

module.exports = mongoose.model('card', cardSchema)