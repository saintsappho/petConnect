const express = require('express');
const router  = express.Router();
const { getLikes } = require('../db/queries/getLikes');

router.get('/', async (req, res) => {
  try {
    const likes = await getLikes()
    console.log(likes)
    res.send(likes)
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
