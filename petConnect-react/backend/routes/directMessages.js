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

  socket.on("join_chat", (chatId) => {
    console.log(`User joined chat: ${chatId}`);
    socket.join(chatId);
  });

  socket.on("send_message", async (message) => {
    try {
      console.log("Message received:", message);
      // Emit the new message to all clients in the chat room
      io.to(message.chatId).emit('new_message', message);

      // Additional logic for saving the message to the database, if necessary
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });
});

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
