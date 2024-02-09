const { use } = require("../../../routes/users");
const db = require("../../connection");
const pollsRouter = require("../../../routes/polls");

const newPoll = async (pollDataInput, choices) => {
  const {
    poll_ID,
    creator_ID, // hard-coded for now
    title,
  } = pollDataInput; // destructuring
  // console.log("pollData in query", pollDataInput);

  try {
    const pollData = await db.query(
      `INSERT INTO polls (poll_ID, creator_ID, title)
       VALUES ($1, $2, $3) 
       RETURNING *;`,
      [poll_ID, creator_ID, title],
    );

    const insertedChoices = [];
    for (let choice of choices) {
      try {
        // console.log("choice", choice);
        const choiceData = await db.query(
          `INSERT INTO choices (poll_ID, choiceText)
           VALUES ($1, $2) 
           RETURNING *;`,
          [choice.poll_ID, choice.choiceText],
        );
    
        console.log("Choice inserted:", choiceData.rows[0]);
        insertedChoices.push(choiceData.rows[0]);
      } catch (error) {
        console.error("Error inserting choice:", error.message);
      }
    }

    return { pollData: pollData.rows[0], choiceData: insertedChoices };
  } catch (error) {
    throw error;
  }
};

module.exports = { newPoll };
