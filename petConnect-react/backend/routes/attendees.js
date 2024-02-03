const express = require('express');
const router  = express.Router();
const { getAttendees } = require('../db/queries/gets/getAttendees');

router.get('/', async (req, res) => {
  try {
    const attendees = await getAttendees()
    console.log(attendees)
    res.send(attendees)
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
