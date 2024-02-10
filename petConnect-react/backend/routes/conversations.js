const { Pool } = require('pg');
const express = require("express");
const router = express.Router();
const { getChats } = require('../db/queries/gets/getChats');


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

//new conversation
router.post("/", async (req, res) => {
  const { user1_username, user2_username } = req.body;
console.log(req.body);
  const insertQuery = `
    INSERT INTO chats (user1_username, user2_username, user_photo_url)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
 const img_url = 'https://images.unsplash.com/photo-1435348773030-a1d74f568bc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80';
  const selectQuery = `
  SELECT *
  FROM chats
  WHERE
  (user1_username = $1 OR user2_username = $1) AND (user1_username = $2 OR user2_username = $2);
`;

  try {
    // Insert the new conversation into the database
    const existingConversation = await pool.query(selectQuery, [user1_username, user2_username]);
    console.log(existingConversation);
    if (existingConversation.rows[0]){
      return res.status(200).json(existingConversation.rows[0]);
    }

    const newConversation = await pool.query(insertQuery, [user1_username, user2_username, img_url]);

    res.status(200).json(newConversation.rows[0]);
  } catch (error) {
    console.error(error);

    if (error.code === '23505') {
      // Unique violation (duplicate conversation, handle accordingly)
      res.status(400).json({ error: 'Duplicate conversation' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});


// Get conversation of a user
router.get("/:username", async (req, res) => {
  const username = req.params.username;

  // Fetch conversations for the specified user
  const getConversationsQuery = `
    SELECT *
    FROM chats
    WHERE user1_username = $1 OR user2_username = $1;
  `;

  try {
    // Fetch conversations for the specified user
    const conversations = await pool.query(getConversationsQuery, [username]);

    res.status(200).json(conversations.rows);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete conversations
router.delete("/:chatId", async (req, res) => {
  const chatId = req.params.chatId;

  try {
    // Delete conversation from the database
    await pool.query('DELETE FROM chats WHERE chat_ID = $1', [chatId]);

    res.status(200).json({ message: 'Conversation deleted successfully.' });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// get conversation including two userIds

// router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
//   try {
//     const conversation = await getChats.findOne({
//       members: { $all: [req.params.firstUserId, req.params.secondUserId] },
//     });
//     res.status(200).json(conversation)
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
