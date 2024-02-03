const express = require('express');
const router  = express.Router();
const { getUsers } = require('../db/queries/gets/getUsers');

router.get('/', async (req, res) => {
  try {
    const users = await getUsers()
    console.log(users)
    res.send(users)
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
