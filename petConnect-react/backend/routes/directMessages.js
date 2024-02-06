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

  socket.on("send_message", (data) => {
    socket.to(currentChat.chat_ID).emit('send_message', response.data);
  });
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});

router.post("/", async (req, res) => {
  const insertQuery = `
    INSERT INTO messages (chat_ID, sender, receiver, message, timestamp)
    VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
    RETURNING *;
  `;

  const values = [
    req.body.chat_ID,
    req.body.sender,
    req.body.receiver,
    req.body.message
  ];

  try {
    const newMessage = await getMessages.query(insertQuery, values);
    res.status(201).json(newMessage.rows[0]);
  } catch (err) {
    console.error(err);

    if (error.code === '23505') {
      // Unique violation (duplicate message, handle accordingly)
      res.status(400).json({ error: 'Duplicate message' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

router.get("/:conversationId", async (req, res) => {
  const selectQuery = `
    SELECT * FROM messages
    WHERE chat_ID = $1;
  `;

  const values = [req.params.conversationId];

  try {
    const messages = await getMessages.query(selectQuery, values);
    res.status(200).json(messages.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
