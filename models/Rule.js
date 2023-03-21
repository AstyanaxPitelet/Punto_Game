const mongoose = require('mongoose')

const ruleSchema = new mongoose.Schema({
    nbPlayer: { type: Number },
    deck: [[ {
        type: mongoose.Types.ObjectId,
        ref: "card"
    } ]]
})

module.exports = mongoose.model('rule', ruleSchema)