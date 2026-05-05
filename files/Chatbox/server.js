const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    socket.on('join', (username) => {
        socket.username = username;
        socket.broadcast.emit('message', {
            type: 'notification',
            text: `${username} has joined the chat.`
            
        });
    });

    socket.on('chatMessage', (msg) => {
        io.emit('message', {
            type: 'message',
            username: socket.username,
            text: msg
        });
    });

    socket.on('disconnect', () => {
        if (socket.username) {
            io.emit('message', {
                type: 'notification',
                text: `${socket.username} has left the chat.`
            });
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
