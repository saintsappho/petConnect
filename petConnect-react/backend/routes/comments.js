const express = require('express');
const router  = express.Router();
const { getMessages } = require('../db/queries/getMessages');

router.get('/', async (req, res) => {
  try {
    const messages = await getMessages()
    console.log(messages)
    res.send(messages)
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
