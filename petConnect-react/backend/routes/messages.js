const express = require('express');
const router  = express.Router();
const app = express();
const { getMessages } = require('../db/queries/gets/getMessages');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log('User is connected: ${socket.id}');

  socket.on("join_chat", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.chat).emit("receive_message", data);
  });
});

// Add your router middleware after socket.io middleware
app.use('/message', router); // Replace with your actual route prefix

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});


// const express = require('express');
// const router  = express.Router();
// const app = express();
// // const { getComments } = require('../db/queries/gets/getComments');
// const http = require('http');
// const { Server } = require("socket.io");
// const cors = require('cors');
// app.use(cors());

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: { origin: "http://localhost:8080", methods: ["GET", "POST"] },
// });

// io.on("connection", (socket) => {
//   console.log('User is connected: ${socket.id}');

//   socket.on("join_chat", (data) => {
//     socket.join(data);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.chat).emit("receive_message", data);
//   });
// });

// server.listen(4000, () => {
//   console.log("Server is running on port 4000");
// })

// // io.on("connection", (socket) => {
// //   console.log(`a user connected ${socket.id}`);

// //   socket.on("send_message", (data) => {
// //     socket.broadcast.emit("receive_message", data);
// //   });
// // });
// // server.listen(4000, () => {
// //   console.log("listening on *:4000");
// // });

router.get('/', async (req, res) => {
  try {
    const messages = await getMessages()
    console.log(messages)
    res.send(messages)
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// // server.listen(4000, () => {
// //   console.log("listening on *:4000");
// // });

// // server.close(() => {
// //   console.log('Server closed.');
// // });

module.exports = router;
