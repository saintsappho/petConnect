import useFetchData from "../hooks/useFetchData.js";
import "../styles/TopNav.scss";
import LogoutButton from "./Logout";
import Modal from "./modals/Modal.jsx";

export default function Navbar({ petData, handlePetListSelect, openCurrentUserModal, user }) {
  return (
    <nav className="top-nav-bar">
      <div className="top-nav-bar__logo"></div>
      <div className="top-nav-bar__title">
        <h1>PetConnect</h1>
      </div>

      <div className="nav-dropdown">
        <button className="nav-dropdown-button" onClick={openCurrentUserModal}>
          <img className="nav-user-photo" src={user.picture}></img>
        </button>
        <div className="nav-dropdown-body">
          <div className="nav-dropdown-petlist">
            <a href="#">My Pets</a>
            <div className="user-pets">
              {petData &&
                (petData.map((pet) => (
                  <a key={pet.pet_id} onClick={(event) => handlePetListSelect(event, pet)}>
                    {pet.pet_name}
                  </a>
                )))}
            </div>
          </div>
          <a href="/">Settings</a>
          <a href="/">About</a>
          <a href="/" onClick={LogoutButton}>Logout</a>
        </div>
      </div>

    </nav>
  );
}
