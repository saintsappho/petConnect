import React, { useState, useEffect } from 'react';
import XPBar from './XPBar';

export default function PetPointsFeedWidget({ handleSetPetPoints, petPoints, user, achievements, setAchievements }) {
  const [ranking, setRanking] = useState('Bronze');
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

  const incrementPoints = () => {
    const newPoints = petPoints + 10;
    handleSetPetPoints(newPoints);
  };
  const xpBarData = [
    { bgcolor: "#6a1b9a", completed: petPoints },
  ];

  const handleComplete = (index) => {
    setAchievements(prevAchievements => {
      const newAchievements = [...prevAchievements];
      newAchievements[index].completed = true;
      return newAchievements;
    });
  };

  return (
    <div className="pet-points-feed-widget-background">
      <div className="pet-points-feed-widget">
        <div className="pet-points-feed-widget-content">
          <h1>Pet<span className="pet-points-feed-widget-xp">XP</span>: {petPoints}</h1>
          <h3 className="pet-points-feed-widget-ranking-line">Ranking: <span className="pet-points-feed-widget-ranking">{ranking}</span></h3>


          <div className="xp-bar-container">
            <div>{xpBarData.map((item, idx) => (
              <XPBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
            ))}</div>
          </div>
          <button onClick={(event) => handleSetPetPoints(event, 10)}>Claim Daily Login!</button>
          <h2>Daily Adventures:</h2>
          <ul>
            {achievements.slice(0, 3).map((achievement, index) => (
              <li id="daily-challenge" key={index}>
                <span className="achievement-icon">{achievement.icon}</span>
                <div className="achievement-info">
                  <h4>{achievement.name}</h4>
                  <p className="pet-points-feed-widget-achievement-description">{achievement.description}</p>
                </div>
                <button onClick={() => handleComplete(index)}>
                  {achievement.completed ? 'Completed!' : 'Complete Challenge'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

  );
}
