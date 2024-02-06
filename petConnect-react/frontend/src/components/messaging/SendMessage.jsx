import React, { useState } from 'react';
import './SendMessage.scss';

export default function SendMessage({ currentChat, socket }) {
  const [newMessage, setNewMessage] = useState("");

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

// import React, { useState } from 'react';
// import axios from 'axios';
// import './SendMessage.scss';

// export default function SendMessage({ currentChat, onMessageSent }) {
//   const [newMessage, setNewMessage] = useState("");

//   const handleSendMessage = async () => {
//     try {
//       // Check if currentChat exists before accessing properties
//       if (!currentChat || !currentChat.chat_id) {
//         console.error("No chat selected");
//         return;
//       }
  
//       // Send the message to the backend
//       const response = await axios.post('http://localhost:8080/directMessages', {
//         chat_ID: currentChat.chat_id,
//         sender: currentChat.user1_ID,
//         receiver: currentChat.user2_ID,
//         message: newMessage,
//       });

//       // Notify the parent component that a message has been sent
//       onMessageSent(response.data);
  
//       // Clear the input field
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

  return (
    <div>
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
  );
}