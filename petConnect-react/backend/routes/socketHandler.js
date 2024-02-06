const socketIO = require('socket.io');
const { getMessages } = require('../db/queries/gets/getMessages');


const connectedUsers = {};

const initializeSocket = (server) => {
  const io = socketIO(server, { path: '/socket.io'});

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('login', (userId) => {
      console.log(`User ${userId} logged in`);
      connectedUsers[userId] = socket.id;
      socket.broadcast.emit('userOnline', userId);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
      const disconnectedUserId = Object.keys(connectedUsers).find(
        (key) => connectedUsers[key] === socket.id
      );
      if (disconnectedUserId) {
        delete connectedUsers[disconnectedUserId];
        socket.broadcast.emit('userOffline', disconnectedUserId);
      }
    });
  });

  return io; // Export the io instance
};

module.exports = { initializeSocket, connectedUsers };
