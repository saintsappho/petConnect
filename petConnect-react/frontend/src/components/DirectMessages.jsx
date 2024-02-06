import { useEffect, useState, useCallback } from "react";
import "../styles/DirectMessages.scss";
import io from 'socket.io-client';
import axios from "axios";
import NavBar from "./NavBar";
import Conversations from "./messaging/Conversations";
import SendMessage from "./messaging/SendMessage";
import useFetchData from "../hooks/useFetchData";


export default function DirectMessages({ userId }) {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);
 
  // Fetch conversations data using custom hook
  useFetchData("http://localhost:8080/conversations", null, setConversations, console.error);

  // Callback function to fetch data from the backend
  const fetchDataCallback = async (url, setData, setError) => {
    try {
      const response = await axios.get(url);
      console.log(`Fetched data from ${url}:`, response.data);
      setData(response.data);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error.message);
      setError(error.message);
      setData([]);
    }
  };
  
  // event handler for when a conversation is clicked
  const handleConversationClick = (selectedChat) => {
    console.log("Clicked on conversation:", selectedChat);
  
    if (!selectedChat.chat_id) {
      console.log("No chat selected");
      return;
    }
  
    setCurrentChat(selectedChat);
    console.log("Selected chat:", selectedChat);
  
    // Fetch messages for the selected chat
    const url = `http://localhost:8080/directMessages/${selectedChat.chat_id}`;
    fetchDataCallback(url, setMessages, (error) => {
      console.error("Error fetching messages:", error);
    });
  };

  // Connect to the Socket.IO server
  useEffect(() => {
    const socket = io('http://localhost:4000', { path: '/socket.io' });

    socket.on('connect', () => {
    console.log("Socket connected:", socket.connected);

    // Listen for new conversations
    socket.on('conversation_created', (newConversation) => {
      console.log("New conversation received:", newConversation);
      setConversations((prevConversations) => [...prevConversations, newConversation]);
    });

    // Listen for new messages
    socket.on('new_message', (newMessage) => {
      console.log("New message received:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  });

    return () => {
      // Clean up listeners on component unmount
      console.log("Cleaning up listeners");
      socket.off('conversation_created');
      socket.off('new_message');
      // Remove other listeners
    };
  }, []);

  // Callback function to post data to the backend
  const postDataCallback = async (data, setData, setError) => {
    const url = 'http://localhost:8080:/api/directMessages';
    try {
      const response = await axios.post(url, data);
      console.log(`Posted data to ${url}:`, response.data);
      setData(response.data);
    } catch (error) {
      console.error(`Error posting data to ${url}:`, error.message);
      setError(error.message);
      setData([]);
    }
  };
  
  // event handler for when a message is sent
  const handleSendMessage = async () => {
    const socket = io('http://localhost:4000', { path: '/socket.io' });
    try {
      // Check if currentChat exists before accessing properties
      if (!currentChat || !currentChat.chat_id) {
        console.error("No chat selected");
        return;
      }
  
      // Prepare data for the POST request
      const postData = {
        chat_ID: currentChat.chat_id,
        sender: currentChat.user1_ID,
        receiver: currentChat.user2_ID,
        message: newMessage,
      };
  
      // Make the POST request
      postDataCallback('http://localhost:8080/api/directMessages', postData, setMessages, setError);

      socket.emit('send_message', postData);
      // Clear the input field
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

return (
  <div>
    {/* <NavBar /> */}
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
            {Array.isArray(messages) && messages.map((message) => (
              <SendMessage
              key={message.id}
              message={message.message}
              mine={message.sender === currentChat.user1_ID} />
            ))}
          </div>

          <div className="message_box_footer">
            <textarea
            className="message_type_box"
            id="message"
            cols="30"
            rows="10"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            ></textarea>
            <button className="send_message_button" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}