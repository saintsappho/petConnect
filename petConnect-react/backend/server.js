// load .env data into process.env
require('dotenv').config();

// Web server config
const { initializeSocket } = require('./routes/socketHandler');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const morgan = require('morgan');
const session = require('express-session');
const PORT = process.env.PORT || 8080;
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret',
  resave: false,
  saveUninitialized: true
}));

// Create a new HTTP server using the Express app
const server = http.createServer(app);

// Add Socket.IO to the server
const io = initializeSocket(server);

// Separated Routes for each Resource

const usersRoutes = require('./routes/users');
const petsRoutes = require('./routes/pets');
const postsRoutes = require('./routes/posts');
const eventsRoutes = require('./routes/events');
const chatsRoutes = require('./routes/chats');
const messagesRoutes = require('./routes/messages');
const directMessagesRoutes = require('./routes/directMessages');
const conversationsRoutes = require('./routes/conversations');
const commentsRoutes = require('./routes/comments');
const likesRoutes = require('./routes/likes');
const attendeesRoutes = require('./routes/attendees');
const followsRoutes = require('./routes/follows');

// Mount all resource routes
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/users', usersRoutes);
app.use('/pets', petsRoutes);
app.use('/posts', postsRoutes);
app.use('/events', eventsRoutes);
app.use('/chats', chatsRoutes);
app.use('/messages', messagesRoutes);
app.use('/directMessages', directMessagesRoutes);
app.use('/conversations', conversationsRoutes);
app.use('/comments', commentsRoutes);
app.use('/likes', likesRoutes);
app.use('/attendees', attendeesRoutes);
app.use('/follows', followsRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('<h1>Welcome to the Backend</h1>');
});

// Socket.IO logic
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle Socket.IO events here

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
