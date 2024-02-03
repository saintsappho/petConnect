const db = require('../../connection');

const getEvents = () => {
  return db.query('SELECT * FROM events;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getEvents };
