const express = require('express');
const router  = express.Router();
const { getPolls, getPollsByPostID } = require('../db/queries/gets/getPolls');
const { newPoll } = require('../db/queries/news/newPoll');

router.get('/', async (req, res) => {
  try {
    const polls = await getPolls()
    // console.log(polls)
    res.send(polls)
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error: Failed to get Polls');
  }
});
//get By post_ID
router.get('/:id', async (req, res) => {
  try {
    const polls = await getPollsByPostID(req.params.id)
    // console.log(polls)
    res.send(polls)
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error: Failed to get Polls by post_ID');
  }
});


router.post("/", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const pollData = {
      creator_ID: 1, // hard-coded for now
      post_ID: req.body.post_ID,
      title: req.body.title
    } 
    const choices = []
    const choiceData = {
      poll_ID: req.body.post_ID,
    }
    let n = 0;
    while (`choice${n}`){
      choiceData = {
        choiceText: req.body[`choice${n}`]
      }; 
      choices.push(choiceData);
      n++
    }
    const thisPoll = await newPoll(pollData, choices);
    res.status(201).json(thisPoll);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error: Failed to schedule Poll");
  }
});


module.exports = router;

