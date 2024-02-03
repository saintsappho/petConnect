const db = require('../connection');

const getChats = () => {
  return db.query('SELECT * FROM chats;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getChats };
