const express = require("express");
const router = express.Router();
const { getChats } = require('../db/queries/gets/getChats');


//new conversation

router.post("/", async (req, res) => {
  const insertQuery = `
    INSERT INTO chats (user1_ID, user2_ID)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const seedChats = [
    { user1_ID: 1, user2_ID: 2 },
    { user1_ID: 2, user2_ID: 3 },
    { user1_ID: 3, user2_ID: 4 },
    { user1_ID: 4, user2_ID: 5 },
  ];

  try {
    const conversations = await Promise.all(seedChats.map(async (chat) => {
      const values = [chat.user1_ID, chat.user2_ID];
      const newConversation = await getChats.query(insertQuery, values);
      return newConversation.rows[0];
    }));

    res.status(200).json(conversations);
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

router.get("/:user_Id", (req, res) => {
  console.log('GET /api/conversations endpoint hit');
  getChats()
  .then(conversation => {
    console.log('Conversations fetched:', conversation);
    res.status(200).json(conversation);
  })
  .catch(error => {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  });
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
