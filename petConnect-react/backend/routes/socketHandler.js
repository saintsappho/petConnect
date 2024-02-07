const socketIO = require('socket.io');
const { getMessages } = require('../db/queries/gets/getMessages');


const connectedUsers = {};

const initializeSocket = (server) => {
  const io = socketIO(server, { path: '/socket.io'});

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('login', (userId) => {
      console.log(`User ${userId} logged in`);
      socket.request.session.userId = userId;
      socket.broadcast.emit('userOnline', userId);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
      const userId = socket.request.session.userId;
      if (userId) {
        delete socket.request.session.userId;
        socket.broadcast.emit('userOffline', userId);
      }
    });
  });

  return io; // Export the io instance
};

module.exports = { initializeSocket, connectedUsers };
