// import "./Messages.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");

function Messages() {
  // Room state
  const [chat, setChat] = useState("");
  // Message State
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinChat = () => {
    if (chat !== "") {
      socket.emit("join_chat", chat);
    }
  }
  
  const sendMessage = () => {
    console.log("Button clicked");
    socket.emit("send_message", { message, chat });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="Messages">
      <input
        placeholder="Message"
        onChange={(e) => {
          setChat(e.target.value);
        }}
      />
      <button onClick={joinChat}>Join the Chat</button>
      <input
      placeholder="Message..."
      onChange={(e) => {
        setMessage(e.target.value);
      }}
      />
      <button onClick={sendMessage}>Send</button>
      <h1>
        Message: {messageReceived}</h1>
    </div>
  );
}

export default Messages;