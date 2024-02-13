const { updatePoints, getPoints } = require('../../db/queries/posts/newPoints.js'); // Import the necessary functions from your database queries

app.get('/api/petPoints/:petId', async (req, res) => {
  const petId = req.params.petId;
  try {
    // Query the database to get pet points based on petId
    const petPoints = await getPoints(petId);
    res.json({ points: petPoints });
  } catch (error) {
    console.error('Error fetching pet points:', error);
    res.status(500).json({ error: 'An error occurred while fetching pet points' });
  }
});

app.post('/api/updatePoints', async (req, res) => {
  const { userId, newPoints } = req.body;
  try {
    // Update pet points in the database
    await updatePoints(userId, newPoints);
    res.json({ message: 'Pet points updated successfully' });
  } catch (error) {
    console.error('Error updating pet points:', error);
    res.status(500).json({ error: 'An error occurred while updating pet points' });
  }
});
