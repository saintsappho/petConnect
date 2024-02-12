const db = require("../../connection");

const newPet = async (petData, res) => {
  console.log("petData: ", petData);
  const {
    pet_name,
    species,
    age,
    breed,
    color,
    sex,
    medical_conditions,
    diet,
    allergies,
    routines,
    profile_photo_url,
    user_id
  } = petData;
  const query = `INSERT INTO pets (pet_name, species, age, breed, color, sex, medical_conditions, diet, allergies, routines, profile_photo_url, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`;
  const values = [pet_name, species, age, breed, color, sex, medical_conditions, diet, allergies, routines, profile_photo_url, user_id];
  try {
    const data = await db.query(query, values);
    res.json(data.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { newPet };
