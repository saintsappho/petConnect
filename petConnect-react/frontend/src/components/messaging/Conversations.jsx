import { useState, useEffect } from "react";
import axios from 'axios';
import StatusOnline from "./StatusOnline";
//hooks
import useFetchData from "../../hooks/useFetchData";
import "./Conversations.scss";

export default function Conversations({ userId, onConversationClick }) {
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);
  // const [userData, setUserData] = useState({ profilePicture: '', name: '' });
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

  return (
    <div className="conversations">
      {error && <p>Error fetching conversations: {error}</p>}
      {conversations && Array.isArray(conversations) && conversations.map((chat) => (
        <div
          key={chat.chat_id}
          className="conversations_container"
          onClick={() => onConversationClick(chat)}
        >
          {/* Display user information */}
          <img className="conversations_image" src={chat.profile_picture} alt="Profile" />
          <span className="conversations_name">{chat.name}</span>
        </div>
      ))}
    </div>
  );
}
