const db = require('../../connection');

const getPolls = () => {
  return db.query('SELECT * FROM polls;')
    .then(data => {
      return data.rows;
    });
};

const getPollsByPostID = (post_ID) => {
  return db.query('SELECT * FROM polls WHERE poll_ID = $1;', [post_ID])
    .then(data => {
      return data.rows;
    });
};
const getChoicesByPostID = (post_ID) => {
  return db.query('SELECT * FROM choices WHERE poll_ID = $1;', [post_ID])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getPolls, getPollsByPostID, getChoicesByPostID};
