const express = require('express');
const router  = express.Router();
const { getPosts } = require('../db/queries/getPosts');

router.get('/', async (req, res) => {
  try {
    const posts = await getPosts()
    console.log(posts)
    res.send(posts)
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const posts = await getPosts()
    console.log(posts)
    res.send(posts)
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
