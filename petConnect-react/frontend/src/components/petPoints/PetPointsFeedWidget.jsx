import React, { useState } from 'react';

export default function PetPointsfeedWidget() {
  const [petPoints, setPetPoints] = useState(0);
  const [ranking, setRanking] = useState('Bronze');
  const [latestActivity, setLatestActivity] = useState('Played fetch');
  const [achievements, setAchievements] = useState(['First Walk', 'First Fetch']);

  //Note on Data Management:

  // For a real-world application, the data for leaderboards, challenges, and friend activities would likely come from a server. You might use useEffect to fetch this data when the component mounts or when certain actions are taken.
  // The XP level and progress towards the next ranking could be dynamically calculated based on the pet's points, requiring a more complex function to update `

  const [dailyLeaderboard, setDailyLeaderboard] = useState([
    { petName: 'Buddy', points: 120 },
    { petName: 'Charlie', points: 110 },
    // Add more as needed
  ]);
  const [dailyChallenges, setDailyChallenges] = useState([
    { challengeName: '10k Steps Walk', detail: 'Walk 10k steps with your pet to win 50 points' },
    // Add more as needed
  ]);
  const [recentlyCompletedByFriends, setRecentlyCompletedByFriends] = useState([
    { friendName: 'Alex', challenge: '5k Run' },
    // Add more as needed
  ]);
  const [xpLevel, setXpLevel] = useState(0); // You might calculate this based on `petPoints`
  
  const incrementPoints = () => {
    setPetPoints(petPoints + 1);
    // Update ranking, latest activity, achievements, etc. based on new points
  };

return (
  <div className="pet-points-feed-widget-background">
    <div className="pet-points-feed-widget">
    <div className="pet-points-feed-widget-header">
      <h1>Pet Points!</h1>
    </div>
    <div className="pet-points-feed-widget-content">
      <div className="daily-leaderboard">
        <h2>Daily Leaderboard</h2>
        <ul>
          {dailyLeaderboard.map((entry, index) => (
            <li key={index}>{entry.petName}: {entry.points} Points</li>
          ))}
        </ul>
      </div>
      <div className="daily-challenges">
        <h2>Daily Challenges</h2>
        {dailyChallenges.map((challenge, index) => (
          <div key={index}>
            <p>{challenge.challengeName}</p>
            <button onClick={() => alert(challenge.detail)}>View Details</button>
          </div>
        ))}
      </div>
      <div className="recently-completed-by-friends">
        <h2>Recently Completed by Friends</h2>
        <ul>
          {recentlyCompletedByFriends.map((activity, index) => (
            <li key={index}>{activity.friendName} completed {activity.challenge}</li>
          ))}
        </ul>
      </div>
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
      <div className="xp-level-bar">
        <h2>XP Level: {xpLevel}</h2>
        {/* Placeholder for XP bar - You might use a library or custom CSS */}
        <div className="xp-bar-container">
          <div className="xp-bar-fill" style={{ width: `${(xpLevel % 100) * 100 / 100}%` }}></div>
        </div>
      </div>
    </div>
    </div>
  </div>
);
}

