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
    console.log('Saving message to database:', msg);
    console.log('Sender type:', typeof sender, 'Receiver type:', typeof receiver);
    const client = await pool.connect();

    // Ensure that values are passed as strings to the database query
    const query = {
      text: 'INSERT INTO messages (chat_ID, sender, receiver, message) VALUES ($1, $2::text, $3::text, $4)',
      values: [chatId, sender, receiver, message]
    };

    console.log('Query:', query);

    // Execute the query
    await client.query(query);

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

  // User joins a conversation room
  socket.on("join_conversation", (chatId) => {
    console.log(`User ${socket.id} joined conversation room ${chatId}`);
    socket.join(chatId); // Join the room corresponding to the conversation
  });

  // User leaves a conversation room
  socket.on("leave_conversation", (chatId) => {
    console.log(`User ${socket.id} left conversation room ${chatId}`);
    socket.leave(chatId); // Leave the room corresponding to the conversation
  });

  // User sends a private message
  socket.on("send_private_message", async (messageData) => {
    console.log(`Message received on the backend:`, messageData);
    try {
      // Check if the message data is valid
      if (!messageData || !messageData.chatId || !messageData.sender || !messageData.receiver || !messageData.message) {
        console.error("Error saving message: Invalid", messageData);
        return;
      }

      // Save the message to the database
      await saveMessageToDatabase(messageData);

      // Emit the new message to the sender and receiver
      io.to(messageData.sender).emit('new_message', messageData);
      io.to(messageData.receiver).emit('new_message', messageData);
    } catch (error) {
      console.error("Error saving message:", error);
      socket.emit('error', { message: 'Internal Server Error' });
    }
  });

  // Fetch messages
  socket.on("fetch_messages", async (chatId) => {
    console.log(`Fetching messages for chat: ${chatId}`);
    try {
      const messages = await getMessagesForChat(chatId);
      // Once fetched, emit the messages back to the client
      socket.emit("message_history", messages);
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

router.post("/", async (req, res) => {
  try {
    const { chatId, sender, receiver, message } = req.body;

    // Save the message to the database
    await saveMessageToDatabase({ chatId, sender, receiver, message });

    // Once saved, emit the new message to other clients
    io.to(chatId).emit('new_message', { chatId, sender, receiver, message });

    res.status(201).json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/:chatId", async (req, res) => {
  try {
    const chatId = req.params.chatId;

    // Fetch messages for the specified conversation
    const messages = await getMessagesForChat(chatId);

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Search Endpoint
app.get('/search', async (req, res) => {
  const { query } = req.query;

  try {
    const searchResults = await pool.query(
      'SELECT * FROM users WHERE username ILIKE $1 OR email ILIKE $1',
      [`%${query}%`]
    );

    res.json(searchResults.rows);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/start-conversation", async (req, res) => {
  try {
    const { username, selectedUsername } = req.body;
    console.log('Initiating conversation between user:', username, 'and selected user:', selectedUsername);
    res.status(200).json({ message: 'Conversation initiated successfully' });
  } catch (error) {
    console.error('Error starting conversation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
