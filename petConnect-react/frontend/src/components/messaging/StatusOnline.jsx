import './StatusOnline.scss';

export default function StatusOnline({ user }) {
  const isOnline = user?.isOnline || false;
  
  return (
    <div className="status_online">
      <div className="status_online__container">
        {/* Check if the user object is defined before accessing its properties */}
        {user && (
          <div className="status_online_user">
            {/* Use a conditional class based on the user's online status */}
            <div className={`status_badge ${user.isOnline ? 'online' : ''}`}></div>
            <img className="status_online__image" src="./src/assets/profile-hex.png" alt="Profile" />
          </div>
        )}
        {/* Use a conditional rendering for the user's name */}
        <div className="status_online__name">{user ? user.name : 'Unknown'}</div>
      </div>
    </div>
  );
}