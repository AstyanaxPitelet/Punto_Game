const mongoose = require('mongoose')

const ruleSchema = new mongoose.Schema({
    nbPlayer: { type: Number },
    nbCard: { type: Number },
    contrainte: {
       isN: { type: Boolean },
       color: { type: Array }  
    },
    colors: { type: Array }
})

module.exports = mongoose.model('rule', ruleSchema)