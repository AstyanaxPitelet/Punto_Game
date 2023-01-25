const bcrypt = require('bcrypt')

const User = require('../models/User')
const catchAsync = require('../helpers/catchAsync');

const register = catchAsync(async (req, res) => {
    const {mail, userName, password} = req.body
    try {
        const hashPass = await bcrypt.hashedPassword(password, 10)
        await User.create({
            mail: mail,
            userName: userName,
            password: hashPass
        })
        res.redirect('/login')
    } catch(err) {
        sendError(res, err, "Un probléme est survenue lors de la création du compte")
    }
})

const login = catchAsync(async (req, res) => {
    const {mail, password} = req.body
    try {
        if(getMail(res, mail)) {
           const user = getMail(res, mail)
           const match = await bcrypt.compare(password, user.hashedPassword)
           if(match) {
            //login 
           } 
        } else {
            res.json({error: "Mail ou de mot de passe incorect"})
        }
    } catch(err) {
        sendError(res, err, "")
    }
})

const getMail = catchAsync(async (res, mail) => {
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
    register
}