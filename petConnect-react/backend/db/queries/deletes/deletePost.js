const db = require('../../connection');

const deletePostByID = (id) => {
  return db.query('DELETE FROM posts WHERE post_ID = $1 RETURNING *;', [id])
    .then(data => {
      return data.rows;
    });
};

module.exports = {deletePostByID}