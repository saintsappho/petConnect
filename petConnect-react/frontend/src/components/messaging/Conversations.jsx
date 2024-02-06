import { useState, useEffect } from "react";
import axios from 'axios';
import StatusOnline from "./StatusOnline";
import "./Conversations.scss";

export default function Conversations({ onConversationClick }) {
  const [conversations, setConversations] = useState([]);
console.log('rendering Conversations component');

useEffect(() => {
  console.log('useEffect is executing');
const fetchConversations = () => {
  axios.get('/api/conversations')
  .then(response => {
    console.log('Conversations successfully fetched:', response.data);
    setConversations(response.data);
  })
  .catch(error => {
    console.log('Error fetching conversations:', error);
  });
};
console.log('Calling fetchConversations...');
    fetchConversations();
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
          <div className="conversations_container">
            {/* Include the StatusOnline component here */}
            <StatusOnline user={chat} />
          </div>
          <img className="conversations__image" src="./src/assets/profile-hex.png" alt="Profile" />
          <span className="conversations__name">{chat.name}</span>
        </div>
      ))}
    </div>
  );
}