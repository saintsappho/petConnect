const { use } = require("../../../routes/users");
const db = require("../../connection");
const eventsRouter = require("../../../routes/events");

const newEvent = async (eventData) => {
  const {
    post_ID,
    creator_ID, // hard-coded for now
    title,
    event_description,
    event_location,
    event_date,
    end_date,
  } = eventData; //destructuring
  console.log("eventData in query", eventData);
  try {
    const data = await db.query(
      `INSERT INTO events (
        post_ID,
        creator_ID, 
        title,
        event_description,
        event_location,
        event_date,
        end_date
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *;`,
      [post_ID, creator_ID, title, event_description, event_location, event_date, end_date],
    );
    return data.rows[0];
  } catch (error) {
    throw error;
  }
};
module.exports = { newEvent };
