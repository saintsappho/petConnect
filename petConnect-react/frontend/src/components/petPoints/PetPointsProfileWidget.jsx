import React, { useState } from 'react';

export default function PetPointsProfileWidget({ handleSetPetPoints, petPoints, achievements }) {
  const [ranking, setRanking] = useState('Bronze');
  const [latestActivity, setLatestActivity] = useState('Played fetch');

  return (
    <div className="pet-points-profile-widget">
      <div className="pet-points-profile-widget-content">
        <h1>Pet<span className="pet-points-profile-widget-xp">XP</span>: {petPoints}</h1>
        <h3>Ranking: <span className="pet-points-profile-widget-ranking">{ranking}</span></h3>
        <h3>Latest Activity: {latestActivity}</h3>
        <div className="pet-points-profile-widget-achievements">
          <h3>Achievements:</h3>
          <ul className="achievements-list">
            {achievements.slice(0, 3).map((achievement, index) => (
              <li key={index}>
                <span className="achievement-icon">{achievement.icon}</span>
                <div className="achievement-info">
                  <h5>{achievement.name}</h5>
                  <p className="achievement-description">{achievement.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}