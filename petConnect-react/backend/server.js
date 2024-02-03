// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const morgan = require('morgan');
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

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

const usersRoutes = require('./routes/users');
<<<<<<< HEAD
const loginRoutes = require('./routes/login');
=======
const petsRoutes = require('./routes/pets')
const postsRoutes = require('./routes/posts');
const eventsRoutes = require('./routes/events')
const chatsRoutes = require('./routes/chats')
const messagesRoutes = require('./routes/messages')
const commentsRoutes = require('./routes/comments')
const likesRoutes = require('./routes/likes')
const attendeesRoutes = require('./routes/attendees')
const followsRoutes = require('./routes/follows')
>>>>>>> main

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/users', usersRoutes);
<<<<<<< HEAD
app.use('/api/users', loginRoutes);
=======
app.use('/pets', petsRoutes);
app.use('/posts', postsRoutes);
app.use('/events', eventsRoutes);
app.use('/chats', chatsRoutes);
app.use('/messages', messagesRoutes);
app.use('/comments', commentsRoutes);
app.use('/likes', likesRoutes);
app.use('/attendees', attendeesRoutes);
app.use('/follows', followsRoutes);
// app.use('/users', usersRoutes);
>>>>>>> main
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('<h1>Welcome to the Backend</h1>');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
