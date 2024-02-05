import './StatusOnline.scss';

export default function StatusOnline() {
  
  return (
    <div className="status_online">
      <div className="status_online__container">
      <div className="status_online_user">
          <img className="status_online__image" src="./src/assets/profile-hex.png" />
        </div>
        <div className="status_badge"></div> {/* This will be a green dot if the user is online */}
        <div className="status_online__name">Jane Doe</div>
        </div>
    </div>
  )
}