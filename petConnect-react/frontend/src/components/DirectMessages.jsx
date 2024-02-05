import { useEffect, useState } from "react";
import "../styles/DirectMessages.scss";
import io from 'socket.io-client';
import axios from "axios";
import NavBar from "./NavBar";
import Conversations from "./messaging/Conversations";
import SendMessage from "./messaging/SendMessage";
import StatusOnline from "./messaging/StatusOnline";

const socket = io('http://localhost:5173', { path: '/socket.io' });

export default function DirectMessages({ onConversationClick }) {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");


  const handleConversationClick = (selectedChat) => {
    setCurrentChat(selectedChat);
  }

  useEffect(() => {
    // Listen for new conversations
    socket.on('conversation_created', (newConversation) => {
      setConversations((prevConversations) => [...prevConversations, newConversation]);
    });

    // Listen for new messages
    socket.on('new_message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Add more event listeners as needed

    return () => {
      // Clean up listeners on component unmount
      socket.off('conversation_created');
      socket.off('new_message');
      // Remove other listeners
    };
  }, []);

  const handleSendMessage = async () => {
    try {
      // check if currentChat exists before accessing properties
      if (!currentChat || !currentChat.chat_ID) {
        console.error("No chat selected");
        return;
      }

      // Send the message to the backend
      const response = await axios.post('/api/messages', {
        chat_ID: currentChat.chat_ID,
        sender: currentChat.user1_ID,  
        receiver: currentChat.user2_ID, 
        message: newMessage,
      });

      // Emit a Socket.IO event to notify other clients
      socket.emit('send_message', response.data);

      // Clear the input field
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:",error);
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
          <button>New Message</button>
          <Conversations onConversationClick={handleConversationClick} />
          <Conversations onConversationClick={handleConversationClick} />
        </div>
      </div>

      <div className="message_box">
        <div className="message_box_container">
          <div className="message_box_header">
            <SendMessage />
            <SendMessage mine={true} />
            <SendMessage />
            <SendMessage />
            <SendMessage />
          </div>
          <div className="message_box_footer">
            <textarea className="message_type_box" id="message" cols="30" rows="10" placeholder="Type a message"></textarea>
            <button className="send_message_button" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>

      <div className="message_online">
        <div className="message_online_container">
          <StatusOnline />
        </div>
      </div>
    </div>
  </div>
);
}