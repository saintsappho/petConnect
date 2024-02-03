const db = require('../../connection');

const getComments = () => {
  return db.query('SELECT * FROM comments;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getComments };
