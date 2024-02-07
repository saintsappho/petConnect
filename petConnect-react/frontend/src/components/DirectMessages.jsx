import React, { useEffect, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import "../styles/DirectMessages.scss";
import io from 'socket.io-client';
import NavBar from "./NavBar";
import Conversations from "./messaging/Conversations";
import SendMessage from "./messaging/SendMessage";


export default function DirectMessages({ userId }) {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    const newSocket = io('http://localhost:4000', { path: '/socket.io' });
    setSocket(prev => newSocket);

    newSocket.on('connect', () => {
      console.log("Socket connected:", newSocket.connected);

      // newSocket.on('send_message', (newConversation) => {
      //   console.log(`New conversation received: newConv =  newConversation`);
      //   setConversations((prevConversations) => [...prevConversations, newConversation]);
      // });

      newSocket.on('new_message', (newMessage) => {
        console.log(`New message received: newMessage = ${newMessage}`);
      
        setNewMessage((prevMessages) => {
          console.log('Previous messages:', prevMessages); // Log the value of prevMessages
          console.log('Type of prevMessages:', typeof prevMessages); // Log the type of prevMessages
          
          // If prevMessages is null or undefined, initialize it to an empty array
          prevMessages = prevMessages || [];
          console.log('After initialization, prevMessages:', prevMessages); // Log the value of prevMessages after initialization
      
          return [...prevMessages, newMessage];
        });

        newSocket.on('message_processed', (chatId) => {
          console.log(`Message processed for chat: ${chatId}`);
          // Once the message is processed, trigger the fetch_messages event
          newSocket.emit('fetch_messages', chatId);
        });
      });

      // newSocket.on('fetch_messages', (messages) => {
      //   console.log("Messages received:", messages);
      //   setMessages(messages);
      // })
    });

    return () => {
      console.log("Cleaning up listeners");
      newSocket.disconnect();
    };
  }, []);

  const handleConversationClick = (selectedChat) => {
    setCurrentChat(selectedChat);
    console.log("Selected chat:", selectedChat);
    if (socket) {
    socket.emit('join_chat', selectedChat.chat_id); // Update event name
    socket.emit('fetch_messages', selectedChat.chat_id);
    } else {
      console.log('Not connected to server');
    }
  };


  return (
    <div>
      <Grid templateColumns="repeat(10, 1fr)" h="100vh as={Tabs}">
        <GridItem colSpan="3" borderRight="1px solid gray">
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
        </div>
        </GridItem>

        <GridItem colSpan="7">
        <div className="message_box">
          <div className="message_box_container">
            <div className="message_box_header">
              {Array.isArray(messages) && messages.map((message, index) => (
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
      </GridItem>
      </Grid>
    </div>
  );
}