// Servidor express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');
const { throws } = require('assert');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        // Http server
        this.Server = http.createServer(this.app);   

        // Configuraciones de sockets
        this.io = socketio(this.Server, {/*configuraciones*/});

        // inicializar sockets
        this.sockets = new Sockets(this.io);

    }

    middlewares() {
        // Desplegar el directoio publico
        this.app.use(express.static(path.resolve(__dirname, '../public')));

        // CORS
        this.app.use(cors());

        // Get de los últimos tickets
         this.app.get('/ultimos', (req, res) => {

            res.json({
                ok: true,
                ultimos: this.sockets.ticketList.ultimo13
            })
         })
    }

    // configurarSockets() {
    //     new Sockets(this.io);
    // }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar Sockets
        // this.configurarSockets();

        // Inicializar Server
        this.Server.listen(this.port, () => {
            console.log('Server corriendo en puerto :', this.port);
        });
    }
}

module.exports = Server;