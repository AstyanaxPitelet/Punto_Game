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

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)

    // socket.on("join_room", (roomCode) => {
    //     console.log(`A user joined the room ${roomCode}`);
    //     socket.join(roomCode);
    // });

    socket.on('private message', (data) => {
        socket.broadcast.emit('private message', data.message)
    })

    // socket.on("play", ({ id, roomCode }) => {
    //     console.log(`play at ${id} to ${roomCode}`);
    //     socket.broadcast.to(roomCode).emit("updateGame", id);
    // });
    
    // socket.on("disconnect", () => {
    //     console.log("User Disconnected");
    // });
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

