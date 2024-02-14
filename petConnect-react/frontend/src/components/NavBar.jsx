import "../styles/TopNav.scss";
import { useEffect, useState } from "react";
import LogoutButton from "./Logout";
import PetListWidget from "./PetListWidget.jsx";
import DirectMessages from "./DirectMessages";

export default function Navbar({ petData, openCurrentUserModal, user, userId, accessToken, showAddPetForm, setShowAddPetForm }) {
  const [isDirectMessagesOpen, setDirectMessagesOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  // Opens and closes the direct messages modal
  const openDirectMessages = () => {
    setDirectMessagesOpen(true);
  };
  const closeDirectMessages = () => {
    setDirectMessagesOpen(false);
  };
  // Hides navbar title on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
  <>
    <nav className="top-nav-bar">
      
      <div className="top-nav-bar__logo"></div>
      {isNavbarVisible && <div className="top-nav-bar__title"><h1>PetConnect</h1></div>}
      

        <div className="nav-dropdown">
          <button className="nav-dropdown-button" onClick={openCurrentUserModal}>
            <img className="nav-user-photo" src={user.picture}></img>
          </button>

          <div className="nav-dropdown-body">
            <a href="/">Settings</a>
            <a href="#" id="messageButton" onClick={openDirectMessages}>Message</a>
            <a href="http://maps.google.com/?q=dog-parks" target="_blank">Park Finder</a>
            <a href="/">Shop</a>
            <a href="/" onClick={LogoutButton}><LogoutButton /></a>
          </div>
        </div>

    </nav>
    <div className="pet-list-container"> 
    <PetListWidget setShowAddPetForm={setShowAddPetForm} showAddPetForm={showAddPetForm} user={user} petData={petData} listPayload="currentUser" userId={userId} divClass="nav-pet-widget"/>
    </div>
    {isDirectMessagesOpen && <DirectMessages accessToken={accessToken} userId={userId} onClose={closeDirectMessages} />}
    </>
  );
}
