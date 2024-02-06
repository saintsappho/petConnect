const db = require('../../connection');

const getEvents = () => {
  return db.query('SELECT * FROM events;')
    .then(data => {
      return data.rows;
    });
};

const getEventsByPostID = (post_ID) => {
  return db.query('SELECT * FROM events WHERE post_ID = $1;', [post_ID])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getEvents, getEventsByPostID };