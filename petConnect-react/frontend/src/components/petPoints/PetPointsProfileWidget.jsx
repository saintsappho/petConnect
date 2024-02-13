import React, { useState } from 'react';

export default function PetPointsProfileWidget({ handleSetPetPoints, petPoints, achievements }) {
  const [ranking, setRanking] = useState('Bronze');
  const [latestActivity, setLatestActivity] = useState('Played fetch');

  return (
    <div className="pet-points-profile-widget">
      <div className="pet-points-profile-widget-content">
        <h1>Pet<span className="pet-points-profile-widget-xp">XP</span>: {petPoints}</h1>
        <h3 className="pet-points-profile-widget-ranking-line">Ranking: <span className="pet-points-profile-widget-ranking">{ranking}</span></h3>
        <h4>Latest Activity: {latestActivity}</h4>
        <div className="pet-points-profile-widget-achievements">
          <h2>Recent Adventures:</h2>
          <ul className="pet-points-profile-achievements-list">
            {achievements.filter(achievement => achievement.completed).slice(0, 3).map((achievement, index) => (
              <li id="profile-achievement-list-item" key={index}>
                <span className="profile-achievement-icon">{achievement.icon}</span>
                <div className="profile-achievement-info">
                  <h4>{achievement.name}</h4>
                  <p>{achievement.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
  
            }