const TicketList = require("./ticket-list");

class Sockets {

    constructor(io) {

        this.io = io;

        // Crear la instancia de nuestro ticketList
        this.ticketList = new TicketList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {

            console.log('cliente conectado');

            socket.on('solicitar-ticket', (data, callback) => {
                const nuevoTicket = this.ticketList.crearTicket();
                callback(nuevoTicket);
            })

            socket.on('suiente-ticket-trabajar', ({agente, escritorio}, callback) => {
                
                const suTicket = this.ticketList.asignarTicket(agente, escritorio);
                callback(suTicket);

                this.io.emit('ticket-asignado', this.ticketList.ultimo13)
            })

        });

    }

}

module.exports = Sockets;