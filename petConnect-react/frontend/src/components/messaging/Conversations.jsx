import { useState, useEffect } from "react";
import axios from 'axios';
import StatusOnline from "./StatusOnline";
import SearchUsers from "./SearchUsers";
//hooks
import useFetchData from "../../hooks/useFetchData";
import "./Conversations.scss";

export default function Conversations({ onConversationClick, accessToken, onSearch }) {
  const [conversations, setConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const [searchedUsers, setSearchedUsers] = useState([]);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log("User data:", response.data); // Log user data
        if (response.data.length > 0) {
          setUsername(response.data[0].username);
        }
      } catch (error) {
        console.error("Error fetching userId:", error); // Log the error
        setError(error.message);
      }
    };
  
    fetchUsername();
  }, []);

  useEffect(() => {
    if (!username) return;

    const fetchConversations = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/conversations/${username}`);
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error.message);
        setError(error.message);
      }
    };

    fetchConversations();
  }, [username]);

  console.log("Received username:", username);

  console.log("Conversations:", conversations);


const updateConversations = (newConversation) => {
  setConversations(prevConversations => [...prevConversations, newConversation]);
};

// Delete conversations
const handleDeleteConversation = async (chatId) => {
  try {
    await axios.delete(`http://localhost:8080/conversations/${chatId}`);
    setConversations(prevConversations => prevConversations.filter(conversation => conversation.chat_id !== chatId));
  } catch (error) {
    console.error("Error deleting conversation:", error.message);
    setError(error.message);
  }
};

// search for new conversations to start
const filteredConversations = conversations.filter(conversation =>
  conversation.user2_username.toLowerCase().includes(searchQuery.toLowerCase())
);

return (
  <div className="conversations">
    <div className="message_search">
      <SearchUsers accessToken={accessToken} onSearch={setSearchedUsers} />
      <input
        type="text"
        placeholder="Filter Conversation"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>

    {error && <p>Error fetching conversations: {error}</p>}
    {filteredConversations.map((user) => (
      <div key={user.chat_id} className="conversations_container" onClick={() => onConversationClick(user)}>
        <StatusOnline user={user}/>
        <img className="user_profile_image_msg" src={user.user_photo_url} alt={user.user2_username} />
        <h1 className="user_profile_name_msg">{user.user2_username}</h1>
        <button onClick={() => handleDeleteConversation(user.chat_id)}>Delete</button>
      </div>
    ))}
  </div>
);
}

// return (
//   <div className="conversations">
//     <div className="message_search">
//       <SearchUsers updateConversations={updateConversations} />
//     </div>

//     {error && <p>Error fetching conversations: {error}</p>}
//     {conversations && Array.isArray(conversations) && conversations.map((user) => (
//       <div key={user.chat_id} className="conversations_container" onClick={() => onConversationClick(user)}>
//         <StatusOnline user={user}/>
//         <img className="user_profile_image_msg" src={user.user_photo_url} alt={user.user2_username} />
//           <h1 className="user_profile_name_msg">{user.user2_username}</h1>
//       </div>
//     ))}
//   </div>
// );
// }