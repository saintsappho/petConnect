import "../styles/TopNav.scss";
import LogoutButton from "./Logout";
import PetListWidget from "./PetListWidget.jsx";

export default function Navbar({ petData, openCurrentUserModal, user, userId }) {
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
            <a href="/">Park Finder</a>
            <a href="/">Shop</a>
            <a href="/">About</a>
            <a href="/" onClick={LogoutButton}><LogoutButton /></a>
          </div>
        </div>

    </nav>
    <div className="pet-list-container"> 
    <PetListWidget petData={petData} listPayload="currentUser" userId={userId} divClass="user-pet-list-item"/>
    </div>
    </>
  );
}
