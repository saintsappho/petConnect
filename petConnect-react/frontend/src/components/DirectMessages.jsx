import React from "react";
import "../styles/DirectMessages.scss";
import NavBar from "./NavBar";
import Conversations from "./messaging/conversations";
import SendMessage from "./messaging/SendMessage";

export default function DirectMessages() {
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
            <SendMessage />
            <SendMessage />
          </div>
          <div className="message_box_footer">
            
            </div>
        </div>
      </div>

      <div className="message_online">
        <div className="message_online_container">Online</div>
      </div>
    </div>
    </div>
  );
}