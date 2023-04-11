const express = require('express')
const router = express.Router()
const punto = require('../controllers/punto.controller.js');


router.get('/cartes', punto.cartes)
router.post('/card/id', punto.getCardById)

router.post('/player/name', punto.findUserByMail)
router.post('/rule/player', punto.findByNbPlayer)



module.exports = router