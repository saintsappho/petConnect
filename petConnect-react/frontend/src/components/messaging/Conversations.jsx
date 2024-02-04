import "./conversations.scss";

export default function Conversations() {
  return (
    <div>
      <div className="conversations">
        <div className="conversations_container"></div>
        <img className="conversations__image" src="./src/assets/profile-hex.png" />
        <span className="conversations__name">Jane Doe</span>
      </div>
    </div>
  );
}