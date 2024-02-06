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
  console.log('User is connected: ${socket.id}');

  socket.on("join_chat", (data) => {
    console.log('User joined chat: ${data}');
    socket.join(data);

    io.emit('user join chat', data);
  });

//   socket.on("send_message", (data) => {
//     socket.to(currentChat.chat_ID).emit('send_message', response.data);
//   });
// });

socket.on("send_message", async (data) => {
  try {
    // Send the message to the chat room
    socket.to(data.chat_id).emit('new_message', data);

    const newMessage = await getMessages();

    // Check if newMessage and newMessage.rows exist before accessing properties
    if (newMessage && newMessage.rows && newMessage.rows.length > 0) {
      // Emit the new message to all clients in the chat room
      io.to(data.chat_ID).emit('new_message', newMessage.rows[0]);
    } else {
      console.error("Error: No messages found or invalid message structure");
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
});
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});

router.post("/", (req, res) => {

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
