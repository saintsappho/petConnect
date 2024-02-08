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
          console.error("Error saving message: Invalid message data");
          return;
        }

        // Save the message to the database
        await saveMessageToDatabase(messageData);

        // Emit the new message to the sender and receiver
        io.to(messageData.sender).emit('new_message', messageData);
        io.to(messageData.receiver).emit('new_message', messageData);
      } catch (error) {
        console.error("Error saving message:", error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });


  // // User sends a message
  // socket.on("send_message", async (obj) => {
  //   console.log(`Message received here on the backend: obj =`, obj);
  //   try {
  //     // Check if the text field of the message is not null or undefined
  //     if (obj.message !== null && obj.message !== undefined) {
  //       // Save the message to the database
  //       await saveMessageToDatabase(obj);

  //       // Once saved, emit the new message to other clients
  //       io.to(obj.chatId).emit('new_message', obj);
  //       io.to(obj.chatId).emit('message_processed', obj.chatId);
  //     } else {
  //       console.error("Error saving message: Text field is null or undefined");
  //     }
  //   } catch (error) {
  //     console.error("Error saving message:", error);
  //   }
  // });

  // Fetch messages
  socket.on("fetch_messages", async (chatId) => {
    console.log(`Fetching messages for chat: ${chatId}`);
    try {
      const messages = await getMessagesForChat(chatId);
      // Once fetched, emit the messages back to the client
      socket.emit("messages_fetched", messages);
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

// router.post("/", (req, res) => {
//   console.log("POST request received at /");

//   getMessages()
//     .then(result => {
//       if (result.rows && result.rows.length > 0) {
//         const newMessage = result.rows[0];
//         res.status(201).json(newMessage);
//       } else {
//         res.status(500).json({ error: 'Internal Server Error: No rows returned' });
//       }
//     })
//     .catch(error => {
//       console.error(error);

//       if (error.code === '23505') {
//         res.status(400).json({ error: 'Duplicate message' });
//       } else {
//         res.status(500).json({ error: 'Internal Server Error' });
//       }
//     });
// });

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


// // Define a route for user search
// app.get('/search', async (req, res) => {
//   try {
//     const query = req.query.query; // Get the search query from the request query parameters
//     // Query the database for users matching the search query
//     const searchResults = await db.searchUsers(query);
//     // Return the search results as JSON
//     res.json(searchResults);
//   } catch (error) {
//     console.error('Error searching users:', error);
//     // Return an error response if something goes wrong
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

/// OR

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
    const { userId, selectedUserId } = req.body;
    console.log('Initiating conversation between user:', userId, 'and selected user:', selectedUserId);
    res.status(200).json({ message: 'Conversation initiated successfully' });
  } catch (error) {
    console.error('Error starting conversation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
