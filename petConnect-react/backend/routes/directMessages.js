require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const { Pool } = require('pg');
const express = require("express");
const router = express.Router();
const { getMessages } = require('../db/queries/gets/getMessages');
const app = express();
const cors = require('cors');

app.use(cors());

////////////////////////////////////////////////////////////////////////////////////////////
//////////////         Socket.io Connection
////////////////////////////////////////////////////////////////////////////////////////////

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});


////////////////////////////////////////////////////////////////////////////////////////////
//////////////         PostgreSQL connection
////////////////////////////////////////////////////////////////////////////////////////////


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

const getMessagesForChat = async (chatId) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM messages WHERE chat_ID = $1', [chatId]);
    client.release(); // Release the client back to the pool
    return result.rows; // Return the fetched messages
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

const saveMessageToDatabase = async (msg) => {
  const { chatId, sender, receiver, message } = msg;
  try {
    const client = await pool.connect();
    await client.query('INSERT INTO messages (chat_ID, sender, receiver, message) VALUES ($1, $2, $3, $4)', [chatId, sender, receiver, message]);
    client.release(); // Release the client back to the pool
    console.log('Message saved successfully.');
  } catch (error) {
    console.error('Error saving message:', error);
    throw error;
  }
};


////////////////////////////////////////////////////////////////////////////////////////////
//////////////         Socket.io Routes
////////////////////////////////////////////////////////////////////////////////////////////

io.on("connection", (socket) => {
  console.log(`User connected:`, socket.id);

  // User joins a chat
  socket.on("join_chat", (chatId) => {
    console.log(`User joined chat: ${chatId}`);
    socket.join(chatId);
  });

  // User sends a message
  socket.on("send_message", async (obj) => {
    console.log(`Message received here on the backend: obj =`, obj);
    try {
      // Check if the text field of the message is not null or undefined
      if (obj.message !== null && obj.message !== undefined) {
        // Save the message to the database
        await saveMessageToDatabase(obj);

        // Once saved, emit the new message to other clients
        io.to(obj.chatId).emit('new_message', obj);
        io.to(obj.chatId).emit('message_processed', obj.chatId);
      } else {
        console.error("Error saving message: Text field is null or undefined");
      }
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  // Fetch messages
  socket.on("fetch_messages", async (chatId) => {
    console.log(`Fetching messages for chat: ${chatId}`);
    try {
      const messages = await getMessagesForChat(chatId);
      // Once fetched, emit the messages back to the client
      io.to(chatId).emit("messages_fetched", messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  });

  // User disconnects
  socket.on("disconnect", () => {
    console.log(`User disconnected:`, socket.id);
  });
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});

////////////////////////////////////////////////////////////////////////////////////////////
//////////////         Express Routes
////////////////////////////////////////////////////////////////////////////////////////////

router.post("/", (req, res) => {
  console.log("POST request received at /");

  getMessages()
    .then(result => {
      if (result.rows && result.rows.length > 0) {
        const newMessage = result.rows[0];
        res.status(201).json(newMessage);
      } else {
        res.status(500).json({ error: 'Internal Server Error: No rows returned' });
      }
    })
    .catch(error => {
      console.error(error);

      if (error.code === '23505') {
        res.status(400).json({ error: 'Duplicate message' });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
});

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const conversations = await getConversationsForUser(userId);
    res.status(200).json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update the query to fetch user information along with conversations
const getConversationsForUser = async (userId) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`
      SELECT c.*, u.profile_picture, u.name
      FROM conversations c
      JOIN users u ON c.user_id = u.id
      WHERE c.user_id = $1;
    `, [userId]);
    client.release();
    return result.rows;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};

module.exports = router;
