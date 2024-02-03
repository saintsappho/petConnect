const express = require('express');
const router  = express.Router();
const { getComments } = require('../db/queries/gets/getComments');

router.get('/', async (req, res) => {
  try {
    const comments = await getComments()
    console.log(comments)
    res.send(comments)
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
