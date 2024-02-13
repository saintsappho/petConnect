import React, { useState } from 'react';

export default function PetPointsProfileWidget({ handleSetPetPoints, petPoints }) {
  const [ranking, setRanking] = useState('Bronze');
  const [latestActivity, setLatestActivity] = useState('Played fetch');
  const [achievements, setAchievements] = useState([
    // I want to add fun and cute achievements that I can complete with my pet to earn pet points
    { name: 'Go for a Walk', icon: '🚶', description: 'Walked with pet for at least 10 minutes', completed: true, points: 10 },
    { name: 'Play Fetch', icon: '🎾', description: 'Play fetch for at least 10 minutes', completed: false, points: 10 },
    { name: 'Visit the Vet', icon: '🏥', description: 'Checked in at the vet', completed: false, points: 25 },
    { name: 'Take a Selfie', icon: '📸', description: 'Take a selfie with your pet', completed: false, points: 15 },
    { name: 'Learn a New Trick', icon: '🎩', description: 'Teach your pet a new trick', completed: false, points: 20 },
    { name: 'Go Swimming', icon: '🏊', description: 'Take your pet for a swim', completed: false, points: 30 },
    { name: 'Have a Picnic', icon: '🍉', description: 'Enjoy a picnic with your pet in the park', completed: false, points: 25 },
    { name: 'Dress Up Your Pet', icon: '👗', description: 'Dress up your pet in a costume', completed: false, points: 15 },
    { name: 'Create an Instagram Account', icon: '📷', description: 'Create an Instagram account for your pet and post their first photo', completed: false, points: 20 },
    { name: 'Host a Pet Playdate', icon: '🐾', description: 'Arrange a playdate for your pet with another pet friend', completed: false, points: 30 },
    { name: 'Win a Pet Costume Contest', icon: '🏆', description: 'Enter and win a pet costume contest or competition', completed: false, points: 40 },
    { name: 'Go on a Road Trip', icon: '🚗', description: 'Take your pet on a road trip adventure', completed: false, points: 50 },
    { name: 'Donate to a Pet Charity', icon: '💕', description: 'Donate to a pet charity or rescue organization', completed: false, points: 35 },
    { name: 'Take a Hike', icon: '⛰️', description: 'Go on a hike with your pet and explore nature', completed: false, points: 40 },
    { name: 'Visit a Pet-friendly Café', icon: '☕', description: 'Enjoy a cup of coffee at a pet-friendly café with your pet', completed: false, points: 25 },
    { name: 'Attend a Pet Event', icon: '🎉', description: 'Attend a pet event or expo together with your pet', completed: false, points: 30 },
    { name: 'Create a DIY Toy', icon: '🧸', description: 'Craft a homemade toy for your pet to play with', completed: false, points: 20 },
    { name: 'Explore a New Park', icon: '🌳', description: 'Discover a new park or trail with your pet', completed: false, points: 35 },
    { name: 'Try Agility Training', icon: '🏅', description: 'Participate in agility training with your pet', completed: false, points: 45 },
    { name: 'Have a Picnic', icon: '🧺', description: 'Enjoy a picnic in the park with your pet', completed: false, points: 30 },
    { name: 'Teach a New Trick', icon: '🎩', description: 'Teach your pet a new trick or command', completed: false, points: 35 },
    { name: 'Go Swimming', icon: '🏊‍♂️', description: 'Take your pet for a swim in a pet-friendly pool or beach', completed: false, points: 50 },
    { name: 'Attend a Pet-friendly Movie Night', icon: '🎬', description: 'Attend a pet-friendly movie screening with your pet', completed: false, points: 40 },
    // Add more as needed
  ]);

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
        <button onClick={(event) => handleSetPetPoints(event, 10)}>Claim Daily Login!</button>
      </div>
    </div>
  );
}