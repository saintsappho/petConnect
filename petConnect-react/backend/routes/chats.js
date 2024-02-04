const express = require('express');
const router  = express.Router();
const { getChats } = require('../db/queries/gets/getChats');

router.get('/', async (req, res) => {
  try {
    const chats = await getChats()
    // console.log(chats)
    res.send(chats)
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
