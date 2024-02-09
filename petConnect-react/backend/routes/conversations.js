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

  const insertQuery = `
    INSERT INTO chats (user1_username, user2_username)
    VALUES ($1, $2)
    RETURNING *;
  `;

  try {
    // Insert the new conversation into the database
    const newConversation = await pool.query(insertQuery, [user1_username, user2_username]);

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
