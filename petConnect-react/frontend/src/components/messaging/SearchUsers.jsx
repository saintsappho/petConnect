import { useState, useEffect } from "react";
import axios from 'axios';

export default function SearchUsers({ currentUsername, setConversations }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/directMessages/${searchQuery}`);
      console.log('Search results:', response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleStartConversation = async (user) => {
    try {
      console.log('Starting conversation with user:', user);
      const response = await axios.post('http://localhost:8080/directMessages/start-conversation', {
        userId: currentUsername, 
        selectedUserId: user.id
      });

      // const newConversation = response.data;
      // updateConversations(newConversation);
      // setConversations(prevConversations => [...prevConversations, newConversation]);
  
      setConversations(prevConversations => [...prevConversations, response.data]);
      // console.log('Conversation started successfully test1:', newConversation);
      console.log('Conversation started successfully test2:', response.data);
    } catch (error) {
      console.error('Error starting conversation:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        placeholder="Search for users..."
      />
      <button onClick={handleSearchSubmit}>Search</button>
      <div>
        {searchResults.map((user, index) => (
          <div key={`${user.id}-${index}`}>
            <p>{user.name}</p>
            <p>{user.username}</p>
            <button onClick={() => handleStartConversation(user)}>Start Conversation</button>
          </div>
        ))}
      </div>
    </div>
  );
};