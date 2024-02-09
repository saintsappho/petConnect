import React, { useState } from 'react';

export default function PetPointsProfileWidget() {
  const [petPoints, setPetPoints] = useState(0);
  const [ranking, setRanking] = useState('Bronze');
  const [latestActivity, setLatestActivity] = useState('Played fetch');
  const [achievements, setAchievements] = useState(['First Walk', 'First Fetch']);

  const incrementPoints = () => {
    setPetPoints(petPoints + 1);
    // Update ranking, latest activity, achievements, etc. based on new points
  };

  return (
    <div className="pet-points-profile-widget">
      <div className="pet-points-profile-widget-header">
        <h3>Pet Points</h3>
      </div>
      <div className="pet-points-profile-widget-content">
        <h1>Points: {petPoints}</h1>
        <h2>Ranking: {ranking}</h2>
        <h2>Latest Activity: {latestActivity}</h2>
        <h2>Achievements:</h2>
        <ul>
          {achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
        <button onClick={incrementPoints}>Earn Points</button>
      </div>
    </div>
  );
}