import React, { useState } from 'react';
import axios from 'axios';
import './SendMessage.scss';

export default function SendMessage({ mine, message }) {
  cosnt [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async () => {
    try {
      // Check if currentChat exists before accessing properties
      if (!currentChat || !currentChat.chat_ID) {
        console.error("No chat selected");
        return;
      }
  
      // Send the message to the backend
      const response = await axios.post('http://localhost:8080/directMessages', {
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
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <div className={mine ? "send_message mine" : "send_message"}>
        <div className="send_message_container">
          <div className="send_message_header">
            <img className="send_message__image" src="./src/assets/profile-hex.png" />
            {/* Display the message text */}
            <p className="message_text">{message.text}</p>
          </div>
          <div className="send_message_footer">{message.timestamp}</div>
        </div>
      </div>
    </div>
  );
}