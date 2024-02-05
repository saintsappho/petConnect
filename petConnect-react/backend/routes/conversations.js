const router = require("express").Router();
const { getChats } = require('../db/queries/gets/getChats');

//new conversation

router.post("/", async (req, res) => {
  const insertQuery = `
    INSERT INTO chats (user1_ID, user2_ID)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const values = [req.body.senderId, req.body.receiverId];

  try {
    const newConversation = await getChats.query(insertQuery, values);
    res.status(200).json(newConversation.rows[0]);
  } catch (err) {
    console.error(err);

    if (error.code === '23505') {
      // Unique violation (duplicate conversation, handle accordingly)
      res.status(400).json({ error: 'Duplicate conversation' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// Get conversation of a user

router.get("/conversations/:userId", async (req, res) => {
  try {
    const conversation = await getChats.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get conversation including two userIds

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await getChats.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
