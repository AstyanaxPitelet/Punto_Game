const express = require('express');
const router = express.Router();
const connexionController = require('../controllers/connexion.controller.js');

router.post('/api/register', connexionController.register);

module.exports = router;