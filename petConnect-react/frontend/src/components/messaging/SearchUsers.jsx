import { useState } from "react";
import "./Conversations.scss";
import axios from 'axios';

export default function SearchUsers({ accessToken, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [error, setError] = useState(null);

  // Search for users
  const handleSearchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/users?query=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setSearchedUsers(response.data);
    } catch (error) {
      console.error("Error searching users:", error);
      setError(error.message);
    }
  };

  return (
    <div>
      <input className="search_users"
        type="text"
        placeholder="Search Users"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="search_user_button" onClick={handleSearchUsers}>Search For a New Friend!</button>

      {searchedUsers.map((user) => (
        <div key={user.id} onClick={() => onSearch(user)}>
          {user.username}
        </div>
      ))}
      {error && <p>Error searching users: {error}</p>}
    </div>
  );
}