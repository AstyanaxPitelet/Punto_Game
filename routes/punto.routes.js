const express = require('express')
const router = express.Router()
const connexionController = require('../controllers/punto.controller.js');

router.get('/cartes', connexionController.cartes)

module.exports = router