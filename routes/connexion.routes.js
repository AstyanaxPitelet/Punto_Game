const express = require('express');
const router = express.Router();
const connexionController = require('../controllers/connexion.controller.js');

router.post('/register', connexionController.register)
router.post('/login', connexionController.login)

module.exports = router;