const { use } = require('../../../routes/users');
const db = require('../../connection');
const postsRouter = require('../../../routes/petPoints');

const updatePoints = async (userId, newPoints) => {
  try {
    const data = await db.query(
      `UPDATE pets
       SET points = $1
       WHERE user_id = $2
       RETURNING *;`,
      [newPoints, userId]
    );
    return data.rows[0]; // Assuming you want to return the updated pet data
  } catch (error) {
    throw error;
  }
};

module.exports = { updatePoints };
