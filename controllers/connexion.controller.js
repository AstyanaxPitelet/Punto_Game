const bcrypt = require('bcrypt')

const User = require('../models/User')
const catchAsync = require('../helpers/catchAsync');
// const catchError = require('../helpers/catchError');

const url = 'http://localhost:3000/login'

const catchError = err => {
    let errors = {}
    Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message 
    })
    return errors
}

const userExist = catchAsync(async (mail) => {

}) 

// Test => V
const register = catchAsync(async (req, res) => {
    const {mail, userName, password} = req.body 
    try {  
        const userTest = await User.find()
        if(userTest!=null) {
            userTest.forEach((user) => {
                if(mail==user.mail) {
                    res.json({
                        data: 'Adresse mail déjà utilisé'
                    })
                    next()
                }   
            })
        }  
        await bcrypt.hash(password, 10, async (err, hash) => {
            await User.create({
                mail: mail,
                userName: userName,
                password: hash
            })
            res.json({
                data: 'Inscription réussi'
            })
        }) 
    } catch(err) {
        if(err.name === 'ValidationError') {
            res.json({
                error: catchError(err)
            })
        } else {
            res.json({
                error: 'Une erreur est survenue lors de la création du compte'
            })
        }
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
        error: catchError(err),
        message: message
    })
})

module.exports = {
    register,
    login
}