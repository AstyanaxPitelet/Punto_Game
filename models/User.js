const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    mail: {
        type: String,
        required: [true, "L'adresse mail est obligatoire"] 
    },
    userName: {
        type: String,
        required: [true, "Le nom d'utilisateur est obligatoire"] 
    },
    password: {
        type: String,
        required: [true, "Un mot de passe est requis"] 
    },
    score: {
        win: {type: Number},
        loose: {type: Number}
    }
})

module.exports = mongoose.model('User', userSchema);