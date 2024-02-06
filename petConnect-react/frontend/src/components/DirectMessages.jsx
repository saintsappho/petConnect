import React, { useEffect, useState } from "react";
import "../styles/DirectMessages.scss";
import io from 'socket.io-client';
import NavBar from "./NavBar";
import Conversations from "./messaging/Conversations";
import SendMessage from "./messaging/SendMessage";

export default function DirectMessages({ userId }) {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  // Declare socket variable
  const socket = io('http://localhost:4000', { path: '/socket.io' });

  useEffect(() => {
    socket.on('connect', () => {
      console.log("Socket connected:", socket.connected);

      socket.on('conversation_created', (newConversation) => {
        console.log("New conversation received:", newConversation);
        setConversations((prevConversations) => [...prevConversations, newConversation]);
      });

      socket.on('new_message', (newMessage) => {
        console.log("New message received:", newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    });

    return () => {
      console.log("Cleaning up listeners");
      socket.disconnect();
    };
  }, []);

  const handleConversationClick = (selectedChat) => {
    console.log("Clicked on conversation:", selectedChat);

    if (!selectedChat.chat_id) {
      console.log("No chat selected");
      return;
    }

    setCurrentChat(selectedChat);
    console.log("Selected chat:", selectedChat);

    // Emit an event to request messages for the selected chat
    socket.emit('fetch_messages', selectedChat.chat_id);
  };

  return (
    <div>
      <div className="direct_message">
        <div className="message_menu">
          <div className="message_menu_container">Menu</div>
          <div className="message_search">
            <input type="text" placeholder="Search Messages" />
          </div>
          <div className="message_new">
            <button>Add New Friend to Chat With</button>
            <Conversations userId={userId} onConversationClick={handleConversationClick} />
          </div>
        </div>

        <div className="message_box">
          <div className="message_box_container">
            <div className="message_box_header">
              {messages.map((message, index) => (
                <SendMessage
                  key={index}
                  message={message.message}
                  mine={message.sender === currentChat.user1_ID}
                  currentChat={currentChat}
                  socket={socket}
                />
              ))}
            </div>

            <div className="message_box_footer">
              <SendMessage currentChat={currentChat} socket={socket} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}