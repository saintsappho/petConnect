const db = require('../../connection');

const getComments = () => {
  return db.query('SELECT * FROM comments;')
    .then(data => {
      return data.rows;
    });
};

const getCommentsByPostID = (post_ID) => {
  return db.query('SELECT * FROM comments WHERE post_ID = $1;', [post_ID])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getComments, getCommentsByPostID };
