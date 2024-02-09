import { useState } from "react";
import axios from 'axios';

export default function SearchUsers({ accessToken, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [error, setError] = useState(null);

  const handleSearchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/users?query=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setSearchedUsers(response.data);
      onSearch(response.data); // Pass the search results back to the parent component
    } catch (error) {
      console.error("Error searching users:", error);
      setError(error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Users"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearchUsers}>Search For a New Friend!</button>

      {searchedUsers.map((user) => (
        <div key={user.id} onClick={() => onSearch(user.username)}>
          {user.username}
        </div>
      ))}
      {error && <p>Error searching users: {error}</p>}
    </div>
  );
}
  