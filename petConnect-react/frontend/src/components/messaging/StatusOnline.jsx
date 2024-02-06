import './StatusOnline.scss';

export default function StatusOnline({ user }) {
  const isOnline = user?.isOnline || false;
  
  return (
    <div className="status_online">
      <div className="status_online__container">
        <div className="status_online_user">
          <img className="status_online__image" src="./src/assets/profile-hex.png" alt="Profile" />
        </div>
        <div className={`status_badge ${user.isOnline ? 'online' : ''}`}></div>
        {/* Use a conditional class based on the user's online status */}
        <div className="status_online__name">{user.name}</div>
      </div>
    </div>
  );
}