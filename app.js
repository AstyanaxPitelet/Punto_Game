const express = require("express");
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1/puntogame');

app.get('/api/test', (req, res) => {
    res.send({
        msg: "bonjour"
    })
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './client/public/index.html'))
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

