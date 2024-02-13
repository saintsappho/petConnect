const db = require('../../connection');

const getPosts = () => {
  return db.query('SELECT * FROM posts;')
    .then(data => {
      return data.rows;
    });
};

const getPostByID = (id) => {
  return db.query('SELECT * FROM posts WHERE post_ID = $1;', [id])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getPosts, getPostByID };
