const express = require('express');
const router  = express.Router();
const { getPolls, getPollsByPostID, getChoicesByPostID, getVotesByPollID } = require('../db/queries/gets/getPolls');
const { newPoll, newVote } = require('../db/queries/news/newPoll');

//Get All Polls
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
// Get Poll By post_ID
router.get('/:id', async (req, res) => {
  try {
    const polls = await getPollsByPostID(req.params.id)
    const choices = await getChoicesByPostID(req.params.id)
    const pollData = { polls, choices };
    // console.log(pollData)
    res.send(pollData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error: Failed to get Polls by post_ID');
  }
});


// Create a new Poll and Choices
router.post("/", async (req, res) => {
  try {
    // console.log("req.body", req.body);
    const pollData = {
      creator_ID: req.body.user_ID, // hard-coded on the other end
      poll_ID: req.body.poll_ID,
      title: req.body.title // acts as a question
    } 
    const choices = []
    
    let n = 0;
    while (req.body[`choice${n}`] !== undefined) {
      const choiceData = {
        poll_ID: req.body.poll_ID,
        choiceText: req.body[`choice${n}`]
      }; 
      choices.push(choiceData);
      n++;
    }
    console.log("choices", choices)
    const thisPoll = await newPoll(pollData, choices);
    res.status(201).json(thisPoll);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error: Failed to schedule Poll");
  }
});

// Vote on a Poll
router.post("/:id/vote", async (req, res) => {
  try {
    newVote(req.body);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error: Failed to vote");
  }
})

//Get Polls, Choices, and Votes by post_ID
router.get('/:id/votes', async (req, res) => {
  try {
    const poll_ID = req.params.id;
    const polls = await getPollsByPostID(poll_ID)
    const choices = await getChoicesByPostID(poll_ID)
    const votes = await getVotesByPollID(poll_ID)
    const pollData = { polls, choices, votes };
    // console.log(pollData)
    res.send(pollData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error: Failed to get Polls by post_ID');
  }
});

module.exports = router;

