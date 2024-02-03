const db = require('../../connection');

const getLikes = () => {
  return db.query('SELECT * FROM likes;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getLikes };
