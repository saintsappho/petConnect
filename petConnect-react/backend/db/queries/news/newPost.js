const { use } = require('../../../routes/users');
const db = require('../../connection');

const newPost = async (postData) => {
  const { 
    user_ID, 
    pet_ID, 
    title, 
    content, 
    style, 
    image_file 
  } = postData; //destructuring
  try {
    const data = await db.query(
      `INSERT INTO posts (
        user_ID,
        pet_ID, 
        title,
        content,
        style, 
        image_file
      ) VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *;`,
      [user_ID, pet_ID, title, content, style, image_file],
    );

    return data.rows[0];
  } catch (error) {
    throw error;
  }
};
module.exports = { newPost };