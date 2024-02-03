const db = require('../../connection');

const getAttendees = () => {
  return db.query('SELECT * FROM attendees;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getAttendees };
