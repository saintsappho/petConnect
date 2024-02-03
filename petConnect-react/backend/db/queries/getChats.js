const db = require('../connection');

const getPosts = () => {
  return db.query('SELECT * FROM posts;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getPosts };
