const { use } = require("../../../routes/users");
const db = require("../../connection");
const pollsRouter = require("../../../routes/polls");

const newPoll = async (pollData, choices) => {
  const {
    post_ID,
    creator_ID, // hard-coded for now
    title,
  } = pollData; //destructuring
  console.log("pollData in query", pollData);
  try {
    const pollData = await db.query(
      `INSERT INTO polls (
        post_ID,
        creator_ID, 
        title,
        
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *;`,
      [post_ID, creator_ID, title],
    );
    for (let choice of choices){
      const choiceData = await db.query(
        `INSERT INTO choices (
          poll_ID,
          choiceText
        ) VALUES ($1, $2) 
        RETURNING *;`,
        [pollData.rows[0].poll_ID, choice.choiceText],
      );
    }
    return (pollData.rows[0], choiceData.rows);
  } catch (error) {
    throw error;
  }
};
module.exports = { newPoll };
