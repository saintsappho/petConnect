const { use } = require("../../../routes/users");
const db = require("../../connection");
const pollsRouter = require("../../../routes/polls");

const newPoll = async (pollDataInput, choices) => {
  const {
    post_ID,
    creator_ID, // hard-coded for now
    title,
  } = pollDataInput; //destructuring
  console.log("pollData in query", pollDataInput);
  try {
    const pollData = await db.query(
      `INSERT INTO polls (
        post_ID,
        creator_ID, 
        title        
      ) VALUES ($1, $2, $3) 
      RETURNING *;`,
      [post_ID, creator_ID, title],
    );

    for (let choice of choices){
      await db.query(
        `INSERT INTO choices (
          poll_ID,
          choiceText
        ) VALUES ($1, $2) 
        RETURNING *;`,
        [pollData.rows[0].poll_ID, choice.choiceText],
      );
    }
    return { pollData: pollData.rows[0], choiceData: choices.map(choice => choice.rows[0]) };
  } catch (error) {
    throw error;
  }
};
module.exports = { newPoll };
