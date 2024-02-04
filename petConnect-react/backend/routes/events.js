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

module.exports = router;
