import { useState, useEffect } from "react";
import axios from 'axios';
import StatusOnline from "./StatusOnline";
//hooks
import useFetchData from "../../hooks/useFetchData";
import "./Conversations.scss";

export default function Conversations({ userId, onConversationClick }) {
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({ profilePicture: '', name: '' });
  console.log('rendering Conversations component');

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/conversations/${userId}`);
        console.log(`Fetched conversations:`, response.data);
        setConversations(response.data);
      } catch (error) {
        console.error(`Error fetching conversations:`, error.message);
        setError(error.message);
      }
    };

    fetchConversations();
  }, [userId]);

  useFetchData(`http://localhost:8080/user/${userId}`, 'user data', setUserData, setError);


  const handleClick = (selectedChat) => {
    onConversationClick(selectedChat);
  };

return (
  <div>
    {error && <p>Error fetching conversations: {error}</p>}
    {conversations && Array.isArray(conversations) && conversations.map((chat) => (
      <div
        key={chat.chat_id}
        className="conversations-container"
        onClick={() => handleClick(chat)}
      >
        <div className="status-online">
          <StatusOnline user={chat} />
        </div>

        <img className="conversations-image" src={userData.profilePicture} alt="Profile" />
        <span className="conversations-name">{userData.name}</span>
      </div>
    ))}
  </div>
);
}
