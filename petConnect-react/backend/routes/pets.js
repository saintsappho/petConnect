const express = require('express');
const router  = express.Router();
const { getPets } = require('../db/queries/gets/getPets');
const { newPet } = require('../db/queries/posts/newPet');

// GET /pets

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

router.post('/', async (req, res) => {
  try {
    const addPet = await newPet(pet_name, species, age, breed, color, sex, medical_conditions, diet, allergies, routines, profile_photo_url);
    res.send(addPet);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
