import React, { useState, useEffect } from 'react';
import XPBar from './XPBar';

export default function PetPointsFeedWidget({ handleSetPetPoints, setCreate, petPoints, user, create, achievements, setAchievements, ranking, setRanking }) {
  const [latestActivity, setLatestActivity] = useState('Played fetch');
  const [loadingBarCompleted, setLoadingBarCompleted] = useState(0);
  const [dailyChallenges, setDailyChallenges] = useState([]);

  useEffect(() => {
    // Generate a random index to select a random achievement
    const randomIndex = Math.floor(Math.random() * achievements.length);
    // Get the random achievement
    const randomAchievement = achievements[randomIndex];
    // Set the daily challenge with the random achievement
    setDailyChallenges([{ challengeName: randomAchievement, detail: `Complete the ${randomAchievement} achievement to win points` }]);
  }, [achievements]);

  const [xpLevel, setXpLevel] = useState(0);

  const xpBarData = [
    { bgcolor: petPoints >= 100 ? "#6426e0" : "#6a1b9a", completed: petPoints % 100 },
  ];

  const handleComplete = (index) => {
    setAchievements(prevAchievements => {
      const newAchievements = [...prevAchievements];
      newAchievements[index].completed = true;
      return newAchievements;
    });
    handleSetPetPoints(10); // Add 10 points when an achievement is completed
  };

  return (
    <div className="pet-points-feed-widget-background">
      <div className="pet-points-feed-widget">
        <div className="pet-points-feed-widget-content">
          <h1>Pet<span className="pet-points-feed-widget-xp">XP</span>: {petPoints}</h1>
          <h3 className="pet-points-feed-widget-ranking-line">
            Reward Level: <span className={`pet-points-feed-widget-ranking rank-${ranking.toLowerCase()}`}>{ranking}</span>
          </h3>
          <div className="xp-bar-container">
            <div>{xpBarData.map((item, idx) => (
              <XPBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
            ))}</div>
          </div>
          <button className="bubbly-button" id="daily-login-button" onClick={(event) => { handleSetPetPoints(10); event.target.disabled = true; }}>Claim Daily Login!</button>
          <h2>Daily Adventures:</h2>
          <ul className="pet-points-feed-widget-daily-challenges">
            {achievements.slice(0, 4).map((achievement, index) => (
              <li id="daily-challenge" key={index}>
                <div className="achievement-container">

                    <div className="achievement-icon">
                      {achievement.icon}
                    </div>
                    <div className="achievement-info">
                      <span className="achievement-title">
                        <h4>{achievement.name}</h4>
                      </span>
                      <p className="pet-points-feed-widget-achievement-description">{achievement.description}</p>
                    </div>

                </div>
                <button className={`bubbly-button ${achievement.completed ? 'claimed' : ''}`} onClick={() => { setCreate(!create), handleComplete(index) }}>
                    {achievement.completed ? 'Claimed!' : 'Complete'}
                  </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

  );
}
