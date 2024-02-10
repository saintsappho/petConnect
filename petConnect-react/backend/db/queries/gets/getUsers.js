const db = require('../../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};
const getUsersByID = (id) => {
  return db.query('SELECT * FROM users WHERE user_ID = $1;', [id])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers, getUsersByID };
