const mongoose = require('mongoose')

const ruleSchema = new mongoose.Schema({
    nbPlayer: { type: Number },
    nbCard: { type: Number },
    nbColors: { type: Array }
})

module.exports = mongoose.model('rule', ruleSchema)