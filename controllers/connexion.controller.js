const bcrypt = require('bcrypt')

const User = require('../models/User')
const catchAsync = require('../helpers/catchAsync');

// Test => V
const register = catchAsync(async (req, res) => {
    try {
        const {mail, userName, password} = req.body
        const hashPass = await bcrypt.hash(password, 10)
        await User.create({
            mail: mail,
            userName: userName,
            password: hashPass
        })
    } catch(err) {
        sendError(res, err, "Un probléme est survenue lors de la création du compte")
    }
})

// Test = X
const login = catchAsync(async (req, res) => {
    try {
        const mailClient = req.body.mail.mail
        const userDb = await User.findOne({mail: mailClient})
        if(userDb == null) {
            res.send('Adresse mail ou du mot de passe invalide')
        } 
        const match = await bcrypt.compare(req.body.password.password, userDb.password)
        if(match) {
            // Il renvoie un token 
            // il garde le token
            // dans le client si le token est bon alors envoyer sur la page de punto
            // res.redirect(token...)
        } else {
            res.send('Adresse mail ou du mot de passe invalide')
        }
    } catch(err) {
        // sendError(res, err, "tesssss")
    }
})

const getUser = catchAsync(async (res, mail) => {
    try {
        return await User.find({mail: mail})
    } catch(err) {
        sendError(res, err, "")
    }
})

const getPasswords = catchAsync(async (res) => {
    try {
        await User.find({password})
    } catch(err) {
        sendError(res, err, "")
    }
})


const sendError = (async (res, err, message) => {
    res.json({
        eroor: err,
        message: message
    })
})

module.exports = {
    register,
    login
}