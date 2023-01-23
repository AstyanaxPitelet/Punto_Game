const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    mail: {type: String, required: true},
    userName: {type: String, required: true},
    password: {type: String, required: true},
    score: {
        win: {type: Number},
        loose: {type: Number}
    }
})

module.exports = mongoose.model('User', userSchema);