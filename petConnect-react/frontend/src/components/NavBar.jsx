import "../styles/TopNav.scss";
import LogoutButton from "./Logout";
import PetListWidget from './PetListWidget';

export default function Navbar({ petData, handlePetListSelect, openCurrentUserModal, user, userId }) {
 const listPayload = "currentUser";

  return (
    <nav className="top-nav-bar">
      <div className="top-nav-bar__logo"></div>
      <div className="top-nav-bar__title">
        <h1>PetConnect</h1>
      </div>
    <div className="pet-list-container">
      <div className="nav-dropdown">
        <button className="nav-dropdown-button" onClick={openCurrentUserModal}>
          <img className="nav-user-photo" src={user.picture}></img>
        </button>
        <div className="nav-dropdown-body">
          <div className="nav-dropdown-petlist">
            <div className="user-pets">
            </div>
          </div>
          <a href="/">Settings</a>
          <a href="/">About</a>
          <a href="/" onClick={LogoutButton}>Logout</a>
        </div>
      </div>
      <PetListWidget petData={petData} listPayload={listPayload} userId={userId}/>
      </div>
    </nav>
  );
}
