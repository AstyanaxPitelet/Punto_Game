const express = require('express')
const router = express.Router()
const punto = require('../controllers/punto.controller.js');

router.get('/cartes', punto.cartes)

module.exports = router