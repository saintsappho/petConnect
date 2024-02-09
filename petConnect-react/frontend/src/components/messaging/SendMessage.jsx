import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './SendMessage.scss';

export default function SendMessage({ currentChat, currentUserId, socket }) {
  const [newMessage, setNewMessage] = useState("");

  // Join chat room when currentChat changes
  useEffect(() => {
    if (currentChat && currentChat.chat_id) {
      handleJoinChat(currentChat.chat_id);
    }
  }, [currentChat]);

  // Joining a chat room
  const handleJoinChat = (chatId) => {
    if (socket) {
      socket.emit('join_conversation', chatId);
    }
  };

  // Sending a message
  const handleSendMessage = () => {
    console.log("Sending message:", newMessage);
    if (!socket || !currentChat || !currentChat.chat_id || !newMessage) {
      console.error("Invalid socket or chat or message data");
      return;
    }

    // Emit the message to the server
    socket.emit("send_private_message", {
      chatId: currentChat.chat_id,
      sender: currentChat.user1_id,
      receiver: currentChat.user2_id,
      message: newMessage,
    });

    // Clear the input field
    setNewMessage("");
  };

  const onChange = function(e) {
    setNewMessage(e.target.value);
  }


  return (
    <div>
      <textarea
        className="message_type_box"
        id="message"
        cols="30"
        rows="10"
        placeholder="Say hello to a friend!"
        value={newMessage}
        onChange={onChange}
      ></textarea>
      <button className="send_message_button" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
}