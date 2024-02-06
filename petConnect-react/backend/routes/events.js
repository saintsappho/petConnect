const express = require('express');
const router  = express.Router();
const { getEvents } = require('../db/queries/gets/getEvents');

router.get('/', async (req, res) => {
  try {
    const events = await getEvents()
    // console.log(events)
    res.send(events)
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


router.post("/", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const eventData = {
      creator_ID: 1, // hard-coded for now
      title: req.body.title,
      event_description: req.body.event_description,
      event_location: req.body.event_location,
      event_date: req.body.event_date,
      end_date: req.body.end_date
    } 
    const thisEvent = await newEvent(eventData);
    res.status(201).json(thisEvent);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to schedule Event");
  }
});


module.exports = router;

