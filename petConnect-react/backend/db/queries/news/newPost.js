const { use } = require('../../../routes/users');
const db = require('../../connection');

const newPost = (post) => {
  const { user_ID, pet_ID, style, sub_ID, registration_date, imageURL } = post; 
  return db.query(
    `INSERT INTO posts (
      user_ID, 
      pet_ID, 
      style, 
      sub_ID, 
      registration_date, 
      imageURL
    ) VALUES ($1, $2, $4, $5, $6, $7) 
    RETURNING *;`, 
    [ user_ID, pet_ID, style, sub_ID, registration_date, imageURL]
    )
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      throw error; // Rethrow the error for handling in the calling function
    });
};

module.exports = { newPost };

