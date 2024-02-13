import React, { useState, useEffect } from "react";
import "./SendMessage.scss";

export default function SendMessage({ currentChat, socket }) {
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
      socket.emit("join_conversation", chatId);
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
      sender: currentChat.user1_username,
      receiver: currentChat.user2_username,
      message: newMessage,
    });

    // Clear the input field
    setNewMessage("");
  };
  var animateButton = function (e) {
    e.preventDefault;
    e.target.classList.remove('animate');
    e.target.classList.add('animate');
    setTimeout(function () {
      e.target.classList.remove('animate');
    }, 700);
  };
  var bubblyButtons = document.getElementsByClassName("bubbly-button");
  for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
  }

  const onChange = function (e) {
    setNewMessage(e.target.value);
  };

  return (
    <div>
      <div className="footer-chat">
        <i
          className="icon fa fa-smile-o clickable"
          style={{ fontSize: "25pt" }}
          aria-hidden="true"
        ></i>
        <input
          type="text"
          className="write-message"
          placeholder="Say hello to a friend!"
          value={newMessage}
          onChange={onChange}
        />
        <button className="bubbly-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
