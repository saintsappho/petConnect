import React, { useEffect, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { toast } from 'react-toastify';
import "../styles/DirectMessages.scss";
import io from 'socket.io-client';
import axios from 'axios';
import Conversations from "./messaging/Conversations";
import SendMessage from "./messaging/SendMessage";


export default function DirectMessages({ userId, accessToken }) {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);



  useEffect(() => {
    const newSocket = io('http://localhost:4000', { path: '/socket.io' });

    newSocket.on('connect', () => {
      console.log("Socket connected:", newSocket.connected);
    });

    newSocket.on('message_history', (messageHistory) => {
      console.log("message History:", messageHistory);
      setMessages(messageHistory);
    });

    newSocket.on('new_message', (newMessage) => {
      console.log(`New message received: newMessage = ${newMessage}`);

    // Display notification
    toast('🐶 New Notification!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

      setMessages((prevMessages) => {
        prevMessages = prevMessages || [];
        console.log('After initialization, prevMessages:', prevMessages);

        return [...prevMessages, newMessage];
      });
    });

    setSocket(newSocket);

    return () => {
      console.log("Cleaning up listeners");
      newSocket.disconnect();
    };
  }, []);

  const handleConversationClick = (selectedChat) => {
    setCurrentChat(selectedChat);
    console.log("Selected chat:", selectedChat);
    if (socket) {
      socket.emit('join_conversation', selectedChat.chat_id);
      socket.emit('fetch_messages', selectedChat.chat_id);
    } else {
      console.log('Not connected to server');
    }
  };

  return (
    <div>
      <Grid templateColumns="repeat(10, 1fr)" h="100vh">
        <GridItem colSpan="3" borderRight="1px solid gray">
          <div className="direct_message">
            <div className="message_menu">
              <div className="message_menu_container">Menu</div>
              <div className="message_search">
              </div>
                <div>
                   <Conversations accessToken={accessToken} userId={userId} onConversationClick={handleConversationClick} />
                </div>
              </div>
            </div>
         
        </GridItem>

        <GridItem colSpan="7">
          <div className="message_box">
            <div className="message_box_container">
            <div className="message_box_header">
              {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender === "Bob Doug" ? 'sent' : 'received'}`}>
              <div className="message-content">
                <p className="message-sender">{message.sender}</p>
                <p className="message-text">{message.message}</p>
             </div>
                <p className="message-timestamp">{message.timestamp}</p>
          </div>
          ))}
      </div>
              <div className="message_box_footer">
                <SendMessage currentChat={currentChat} socket={socket} />
              </div>
            </div>
          </div>
          
        </GridItem>
      </Grid>
    </div>
  );
}