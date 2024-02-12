const { use } = require('../../../routes/users');
const db = require('../../connection');
const postsRouter = require('../../../routes/posts');
// const sendPostsUpdate = postsRouter.sendPostsUpdate;

const newPhotoPost = async (postData) => {
  const { 
    user_ID, 
    pet_ID, 
    content, 
    style, 
    image_file 
  } = postData; //destructuring
  try {
    const data = await db.query(
      `INSERT INTO posts (
        user_ID,
        pet_ID, 
        content,
        style, 
        image_file
      ) VALUES ($1, $2, $3, $4, $5) 
      RETURNING *;`,
      [ user_ID, pet_ID, content, style, image_file],
    );
    // sendPostsUpdate(data.rows[0]);
    return data.rows[0];
  } catch (error) {
    throw error;
  }
};
module.exports = { newPhotoPost };