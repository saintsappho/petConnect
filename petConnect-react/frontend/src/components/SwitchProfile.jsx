import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SwitchUsers = ({ authToken }) => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    // Fetch user profiles from the backend when the component mounts
    const fetchUserProfiles = async () => {
      try {
        const response = await axios.get('', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        setUserProfiles(response.data.userProfiles);
      } catch (error) {
        console.error('Error fetching user profiles:', error);
      }
    };

    fetchUserProfiles();
  }, [authToken]);

  const handleProfileChange = async (profileId) => {
    try {
      // Send a request to switch the user profile
      await axios.post('/api/switch-profile', { profileId }, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      // Update the selected profile in the state
      setSelectedProfile(profileId);
    } catch (error) {
      console.error('Error switching profile:', error);
    }
  };

  return (
    <div>
      <h3>Switch User Profile</h3>
      <select value={selectedProfile} onChange={(e) => handleProfileChange(e.target.value)}>
        <option value="">Select Profile</option>
        {userProfiles.map(profile => (
          <option key={profile.id} value={profile.id}>{profile.name}</option>
        ))}
      </select>
    </div>
  );
};

export default SwitchUsers;