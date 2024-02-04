const express = require('express');
const router  = express.Router();
const { getPets } = require('../db/queries/gets/getPets');

router.get('/', async (req, res) => {
  try {
    const pets = await getPets()
    // console.log(pets)
    res.send(pets)
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
