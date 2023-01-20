const express = require("express");
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

mongoose.connect('mongodb://127.0.0.1/puntogame');

app.get('/', (req, res) => {
    
})

app.use((req, res) => {
    res.status(404);
    res.send('Page non trouvée');
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500);
    res.send('Erreur interne du serveur');
});

app.listen(3000, () => {
    console.log(`Application lancée sur le port 3000`);
});

