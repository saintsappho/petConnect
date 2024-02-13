import "../styles/TopNav.scss";
import { useState } from "react";
import LogoutButton from "./Logout";
import PetListWidget from "./PetListWidget.jsx";
import DirectMessages from "./DirectMessages";

export default function Navbar({ petData, openCurrentUserModal, user, userId, accessToken }) {
  const [isDirectMessagesOpen, setDirectMessagesOpen] = useState(false);

  // Opens and closes the direct messages modal
  const openDirectMessages = () => {
    setDirectMessagesOpen(true);
  };
  const closeDirectMessages = () => {
    setDirectMessagesOpen(false);
  };

  return (
  <>
    <nav className="top-nav-bar">
      
      <div className="top-nav-bar__logo"></div>
      <div className="top-nav-bar__title"><h1>PetConnect</h1></div>

        <div className="nav-dropdown">
          <button className="nav-dropdown-button" onClick={openCurrentUserModal}>
            <img className="nav-user-photo" src={user.picture}></img>
          </button>

          <div className="nav-dropdown-body">
            <a href="/">Settings</a>
            <button id="messageButton" onClick={openDirectMessages}>Message</button>
            <a href="http://maps.google.com/?q=dog-parks" target="_blank">Park Finder</a>
            <a href="/">Shop</a>
            <a href="/" onClick={LogoutButton}><LogoutButton /></a>
          </div>
        </div>

    </nav>
    <div className="pet-list-container"> 
    <PetListWidget user={user} petData={petData} listPayload="currentUser" userId={userId} divClass="user-pet-list-item"/>
    </div>
    {isDirectMessagesOpen && <DirectMessages accessToken={accessToken} userId={userId} onClose={closeDirectMessages} />}
    </>
  );
}
