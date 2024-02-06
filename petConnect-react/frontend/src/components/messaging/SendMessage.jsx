import React, { useState } from 'react';
import io from 'socket.io-client';
import './SendMessage.scss';

export default function SendMessage({ currentChat, socket }) {
  const [newMessage, setNewMessage] = useState("");
  const [text, setText] = useState("");
  // const [socket, setSocket] = useState();

  const handleSendMessage = () => {
    console.log("Sending message:", newMessage);
    if (!socket) {
      console.error("Socket is not defined");
      return;
    }

    if (!currentChat || !currentChat.chat_id || !newMessage) {
      console.error("Invalid chat or message data");
      return;
    }

    // Emit the message to the server
    socket.emit("send_message", {
      chatId: currentChat.chat_id,
      sender: currentChat.user1_ID,
      receiver: currentChat.user2_ID,
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
        placeholder="Type a message"
        value={newMessage}
        onChange={onChange}
        // onChange={(e) => setNewMessage(e.target.value)}
      ></textarea>
      <button className="send_message_button" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
}