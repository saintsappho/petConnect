const { use } = require("../../../routes/users");
const db = require("../../connection");
const pollsRouter = require("../../../routes/polls");

const newPoll = async (pollData) => {
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
    const choiceData = await db.query(
      `INSERT INTO choices (
        post_ID,
        creator_ID, 
        title,
        
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *;`,
      [post_ID, creator_ID, title],
    );
    return pollData.rows[0];
  } catch (error) {
    throw error;
  }
};
module.exports = { newPoll };



DROP TABLE IF EXISTS choices CASCADE;
CREATE TABLE choices (
    choice_ID INT PRIMARY KEY,
    pollID INT REFERENCES Polls(poll_ID),
    choiceText TEXT NOT NULL
);
DROP TABLE IF EXISTS votes CASCADE;
CREATE TABLE votes (
    vote_ID INT PRIMARY KEY,
    poll_ID INT REFERENCES Polls(poll_ID),
    choice_ID INT REFERENCES Choices(choice_ID),
    user_ID INT REFERENCES Users(user_ID)
);