import { useState, useEffect } from "react";
import axios from 'axios';
import "./conversations.scss";

export default function Conversations({ onConversationClick }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    axios.get('/api/conversations')
      .then(response => setConversations(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleClick = (selectedChat) => {
    onConversationClick(selectedChat);
  };

  return (
    <div>
      {conversations && Array.isArray(conversations) && conversations.map((chat) => (
        <div
          key={chat.chat_ID}
          className="conversations"
          onClick={() => handleClick(chat)}
        >
          <div className="conversations_container"></div>
          <img className="conversations__image" src="./src/assets/profile-hex.png" alt="Profile" />
          <span className="conversations__name">{chat.name}</span>
        </div>
      ))}
    </div>
  );
}