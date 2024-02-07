const express = require("express");
const http = require('http');
const { Server } = require('socket.io');
const router = express.Router();
const { getMessages } = require('../db/queries/gets/getMessages');
const app = express();
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log(`User connected:`, socket.id);

  // Event when a user joins a chat
  socket.on("join_chat", (chatId) => {
    console.log(`User joined chat: ${chatId}`);
    socket.join(chatId);
  });

  // Event when a user sends a message
  socket.on("send_message", (obj) => {
    console.log(`Message received here on the backend: obj =`, obj);
    io.emit('new_message', obj.message);
    io.emit('message_processed', obj.chatId);
    // io.emit("new_message", {
    //   "senderId",
    //   "text",
    // });
  });

  // Add an event to fetch messages
socket.on("fetch_messages", (chatId) => {
  console.log(`Fetching messages for chat: ${chatId}`);
  // io.emit("fetch_messages", chatId);
});

  // Event when a user disconnects
  socket.on("disconnect", () => {
    console.log(`User disconnected:`, socket.id);
  });
});


// const users = new Map(); // Map to store users and their socketIds

// io.on("connection", (socket) => {
//   console.log(`User connected:`, socket.id);

//   // Function to add user to the Map
//   const addUser = (userId, socketId) => {
//     users.set(userId, socketId);
//   };

//   // Function to get socketId of a user
//   const getUserSocketId = (userId) => {
//     return users.get(userId);
//   };

//   // Function to send message to a specific user
//   const sendMessage = ({ senderId, receiverId, text }) => {
//     const socketId = getUserSocketId(receiverId);
//     if (socketId) {
//       io.to(socketId).emit("getMessage", {
//         senderId,
//         text,
//       });
//     } else {
//       console.log("User not found or offline");
//     }
//   };

//   // Event when a user joins a chat
//   socket.on("join_chat", (chatId) => {
//     console.log(`User joined chat: ${chatId}`);
//     socket.join(chatId);
//   });

//   // Event when a user sends a message
//   socket.on("send_message", ({ senderId, receiverId, text }) => {
//     sendMessage({ senderId, receiverId, text });
//   });

//   // Event when a user disconnects
//   socket.on("disconnect", () => {
//     console.log(`User disconnected:`, socket.id);
//   });
// });

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});

router.post("/", (req, res) => {
  console.log("POST request received at /");

  getMessages()
  .then(result => {
    if (result.rows && result.rows.length > 0) {
      const newMessage = result.rows[0];
      res.status(201).json(newMessage);
    } else {
      // Handle the case where no rows were returned
      res.status(500).json({ error: 'Internal Server Error: No rows returned' });
    }
  })
    .catch(error => {
      console.error(error);

      if (error.code === '23505') {
        // Unique violation (duplicate message, handle accordingly)
        res.status(400).json({ error: 'Duplicate message' });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
});

router.get("/:chat_Id", (req, res) => {

  getMessages()
    .then(result => {
      const messages = result.rows;
      res.status(200).json(messages);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

module.exports = router;
