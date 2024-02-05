import { useEffect, useState } from "react";
import "../styles/DirectMessages.scss";
import io from 'socket.io-client';
import axios from "axios";
import NavBar from "./NavBar";
import Conversations from "./messaging/conversations";
import SendMessage from "./messaging/SendMessage";
import StatusOnline from "./messaging/StatusOnline";

const socket = io('http://localhost:5173');

export default function DirectMessages() {
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const currentUserId = 1; // Replace with the actual current user ID
  const receiverId = 2; // Replace with the actual receiver ID

  useEffect(() => {
    // Fetch conversations when the component mounts
    axios.get(`/api/chats/${currentUserId}`)
      .then(response => setConversations(response.data))
      .catch(error => console.error(error));
  }, [currentUserId]);

  useEffect(() => {
    // Fetch messages for the selected chat
    if (selectedChat) {
      axios.get(`/api/messages/${selectedChat}`)
        .then(response => setMessages(response.data))
        .catch(error => console.error(error));
    }
  }, [selectedChat]);

  useEffect(() => {
    // Example: Listen for new messages
    socket.on('chat message', (msg) => {
      console.log('New message:', msg);
      // Update state or perform actions as needed
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      // Cleanup on component unmount
      socket.disconnect();
    };
  }, [selectedChat]);

  const handleChatSelection = (chatId, receiverId) => {
    setSelectedChat(chatId);
    // Assuming you have a way to determine the sender ID (current user ID)
    const senderId = currentUserId;

    // Here you might want to store senderId and receiverId in state or use them for other purposes
  };

  const handleSendMessage = () => {
    socket.emit('chat message', { chatId: selectedChat, sender: currentUserId, message: newMessage });

    // Send the new message to the selected chat
    axios.post('/api/messages', {
      chat_ID: selectedChat,
      sender: currentUserId, // change when you have a way to determine the sender
      receiver: receiverId, // change when you have a way to determine the receiver
      message: newMessage,
    })
      .then(response => {
        // Update the state or perform any necessary actions
        setMessages([...messages, response.data]);
      })
      .catch(error => console.error(error));

    setNewMessage('');
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
          <Conversations />
          <Conversations />
          <Conversations />
          <Conversations />
        </div>
      </div>

      <div className="message_box">
        <div className="message_box_container">
          <div className="message_box_header">
            <SendMessage />
            <SendMessage mine={true}/>
            <SendMessage />
            <SendMessage />
            <SendMessage />
          </div>
          <div className="message_box_footer">
            <textarea className="message_type_box" id="message" cols="30" rows="10" placeholder="Type a message"></textarea>
            <button className="send_message_button">Send</button>
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