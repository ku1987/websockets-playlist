const express = require('express');
const socket = require('socket.io');

const app = express();
const PORT = 4000;

const server = app.listen(PORT, () => {
  console.log(`Listening to requests on port ${PORT}`);
})

// Static files
app.use(express.static('public'));

const io = socket(server);

io.on('connection', (socket) => {
  console.log(`Made socket connection to ${socket.id}`);

  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
});
