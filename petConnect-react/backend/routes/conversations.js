const router = require("express").Router();
// const db = require('../../db');

//new conversation

router.post("/", async (req, res) => {
  const insertQuery = `
    INSERT INTO chats (user1_ID, user2_ID)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const values = [req.body.senderId, req.body.receiverId];

  try {
    const newConversation = await db.query(insertQuery, values);
    res.status(200).json(newConversation.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get conversation of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await db.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conversation including two userIds

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await db.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
