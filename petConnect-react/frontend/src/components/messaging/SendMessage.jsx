import './SendMessage.scss';

export default function SendMessage({mine}) {
  return (
    <div>
      <div className={mine ? "send_message mine" : "send_message"}>
        <div className="send_message_container">
          <div className="send_message_header">
            <img className="send_message__image" src="./src/assets/profile-hex.png" />
            {/* <span className="send_message__name">Jane Doe</span> */}
            <p className="message_text">Wow what a cool App!</p>
          </div>
          <div className="send_message_footer">1 hour ago</div>
        </div>
      </div>
    </div>
  );
}