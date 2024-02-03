const db = require('../../connection');

const getFollows = () => {
  return db.query('SELECT * FROM follows;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getFollows };
