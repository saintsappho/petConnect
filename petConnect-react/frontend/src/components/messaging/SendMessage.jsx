import './SendMessage.scss';

export default function SendMessage() {
  return (
    <div>
      <div className="send_message">
        <div className="send_message_container">
          <div className="send_message_header">
            <img className="send_message__image" src="./src/assets/profile-hex.png" />
            <span className="send_message__name">Jane Doe</span>
          </div>
          <div className="send_message_footer">1 hour ago
            <input type="text" placeholder="Type a message" />
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}