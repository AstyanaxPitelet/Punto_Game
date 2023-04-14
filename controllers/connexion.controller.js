const bcrypt = require('bcrypt')

const User = require('../models/User')
const catchAsync = require('../helpers/catchAsync');

const jwt = require('jsonwebtoken')


/**
 * Description placeholder
 * 
 * Permet d'avoir les erreurs de validations
 * 
 * @date 4/12/2023 - 10:34:47 AM
 * @author Astyanax Pitelet
 *
 * @param {*} err
 * @returns {{}}
 */
const catchError = err => {
    let errors = {}
    Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message 
    })
    return errors
}


/**
 * Description placeholder
 * 
 * Permet de faire une insciption au site
 * 
 * @date 4/12/2023 - 10:33:37 AM
 * @author Astyanax Pitelet
 *
 * @type {*}
 */
const register = catchAsync(async (req, res) => {
    try {  
        const {mail, userName, password} = req.body 
        const userTest = await User.find()
        if(userTest!=null) {
            userTest.forEach((user) => {
                if(mail==user.mail) {
                    res.send({
                        invalidInformation: 'Adresse mail déjà utilisé'
                    })
                    next()
                }   
            })
        }  
        await bcrypt.hash(password, 10, async (err, hash) => {
            try {
                await User.create({
                    mail: mail,
                    userName: userName,
                    password: hash
                })
                res.send({
                    validInformation: true
                })
            } catch(err) {
                if(err.name === 'ValidationError') {
                    res.send(catchError(err))
                }
            }
        }) 
    } catch(err) {
        res.json({
            error: 'Une erreur est survenue lors de la création du compte'
        })
    }
})


/**
 * Description placeholder
 * 
 * Permet de ce connecter au site
 * 
 * @date 4/12/2023 - 10:33:54 AM
 * @author Astyanax Pitelet
 *
 * @type {*}
 */
const login = catchAsync(async (req, res) => {
    try {
        const mailClient = req.body.mail.mail
        const userDb = await User.findOne({mail: mailClient})
        if(userDb == null) {
            res.send({
                invalidInformation: 'Adresse mail ou du mot de passe invalide'
            })
        } 
        const match = await bcrypt.compare(req.body.password.password, userDb.password)
        if(match) {
            const id = userDb.id
            res.send({
                validInformation: {
                    user: userDb,
                    token: jwt.sign({id}, "jwtSecret", {
                        expiresIn: 3600
                    })
                },
            })
        } else {
            res.send({
                invalidInformation: 'Adresse mail ou du mot de passe invalide'
            })
        }
    } catch(err) {
        
    }
})



module.exports = {
    register,
    login
}