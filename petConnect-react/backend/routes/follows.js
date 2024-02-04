const express = require('express');
const router  = express.Router();
const { getFollows } = require('../db/queries/gets/getFollows');

router.get('/', async (req, res) => {
  try {
    const follows = await getFollows()
    // console.log(follows)
    res.send(follows)
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
