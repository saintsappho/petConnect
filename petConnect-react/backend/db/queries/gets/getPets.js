const db = require('../../connection');

const getPets = () => {
  return db.query('SELECT * FROM pets;')
    .then(data => {
      return data.rows;
    });
};

const getPetsByID = (id) => {
  return db.query('SELECT * FROM pets WHERE user_ID = $1;', [id])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getPets, getPetsByID };
