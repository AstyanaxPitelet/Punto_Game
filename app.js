const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io');

const connexionRoutes = require('./routes/connexion.routes');
const puntoRoutes = require('./routes/punto.routes');

const app = express();
app.use(cors())
app.use(express.json())


// Server socket io
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST']
    }
})


/**
 * Description placeholder
 * 
 * Méthode qui permet le trie des cartes aléatoirement
 * 
 * @date 4/12/2023 - 10:35:29 AM
 * @author Astyanax Pitelet
 *
 * @param {*} array
 * @returns {*}
 */
const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }


// Gestion des sockets
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on('create-room', (infos) => {
        console.log(`A user : ${infos.id} create the room ${infos.room}`);
        socket.join(infos.room)
        io.to(infos.room).emit('lobby-info', infos)
    })

    socket.on('join-room', (infos) => {
        console.log(`A user : ${infos.id} create the room ${infos.room}`);
        socket.join(infos.room)
        io.to(infos.room).emit('lobby-info', infos)
    })

    socket.on('test-e', (value) => {
        io.to(value.room).emit('test', value)
    })

    socket.on('give-card', (infos) => {
        io.to(infos.room).emit('give-card-info', {
            cards: shuffle(infos.cards),
            id: infos.id,
            numero: infos.numero
        })
    })

    socket.on('start-game', (infos) => {
        io.to(infos.room).emit('start-info', infos.compteur)
    })

    socket.on('start-game-players', (infos) => {
        console.log(infos.players)
        io.to(infos.room).emit('start-game-players-info', infos.players)
    })

    socket.on('update-game', (info) => {
        socket.to(info.room).emit('update-info', info)
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected");
    });
})

// db access
mongoose.connect('mongodb://127.0.0.1/puntogame');

app.use('/punto', puntoRoutes);

app.use('/connexion', connexionRoutes);

app.use((req, res) => {
    res.status(404);
    res.send('Page non trouvée');
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500);
    res.send('Erreur interne du serveur');
});

server.listen(3001, () => {
    console.log(`Application lancée sur le port 3001`);
});

