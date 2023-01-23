const User = require('../models/User')
const catchAsync = require('../helpers/catchAsync');
const path = require('path');

const register = catchAsync(async (req, res) => {
    try {
        await User.create({
            mail: req.body.mail,
            userName: req.body.username,
            password: req.body.password
        })
        res.redirect('/')
    } catch(err) {

    }
})