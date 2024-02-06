import { useState, useEffect } from "react";
import axios from 'axios';
import StatusOnline from "./StatusOnline";
//hooks
import useFetchData from "../../hooks/useFetchData";
import "./Conversations.scss";

export default function Conversations({ userId, onConversationClick }) {
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);
  console.log('rendering Conversations component');

const fetchDataCallback = (url, target, setData, setError) => {
  const fetchConversations = async () => {
    try {
      const response = await axios.get(url);
      console.log(`Fetched data from ${target || url}:`, response.data);
      setData(response.data);
    } catch (error) {
      console.error(`Error fetching data from ${target || url}:`, error.message);
      setError(error.message);
    }
  };

  fetchConversations();
};

useFetchData(`http://localhost:8080/conversations/${userId}`, "conversations", setConversations, setError);


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
          <img className="conversations-image" src={"./src/assets/profile-hex.png"} alt="Profile" />
          <span className="conversations-name">{chat.name}</span>
        </div>
      ))}
    </div>
  );
}
