const router = require("express").Router();
const { getMessages } = require('../db/queries/gets/getMessages');


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
