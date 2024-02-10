const express = require('express');
const router  = express.Router();
const { getComments, getCommentsByPostID } = require('../db/queries/gets/getComments');
const { newComment } = require('../db/queries/posts/newComment');

router.get('/', async (req, res) => {
  try {
    const comments = await getComments()
    // console.log(comments)
    res.send(comments)
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const comments = await getCommentsByPostID(req.params.id)
    // console.log(comments)
    res.send(comments)
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const comment = await newComment(req.body.commentData)
    res.send(comment)
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
