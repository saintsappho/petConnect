// Initilize the database connection
const db = require("../../connection");
const commentsRouter = require("../../../routes/comments");

const newComment = async (commentData) => {
  const {
    post_ID,
    user_ID,
    content,
  } = commentData; //destructuring
  console.log("commentData in query", commentData);
  try {
    const data = await db.query(
      `INSERT INTO comments (
        post_ID,
        user_ID,
        content
      ) VALUES ($1, $2, $3) 
      RETURNING *;`,
      [post_ID, user_ID, content],
    );
    return data.rows[0];
  } catch (error) {
    throw error;
  }
};
module.exports = { newComment };

