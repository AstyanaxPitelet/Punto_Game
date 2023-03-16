const express = require('express')
const router = express.Router()
const punto = require('../controllers/punto.controller.js');


router.get('/cartes', punto.cartes)
router.post('/rule/player', punto.findByNbPlayer)
router.post('/card/color', punto.cardByColor)

module.exports = router