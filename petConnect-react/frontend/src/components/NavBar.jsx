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
      <div className="top-nav-bar__links">
        <li className="nav-dropdown">
          <button className="nav-dropdown-button" onClick={openCurrentUserModal}><img className="nav-user-photo" src={user.picture}></img>
            <div className="nav-dropdown-content">
              <a href="/">Profile</a>
              <div className="nav-dropdown-button">My Pets
                {petData &&
                  (petData.map((pet) => (
                    <a key={pet.pet_id} href="#" onClick={() => handlePetListSelect(pet.pet_id)}>
                      {pet.pet_name}
                    </a>
                  )))}
              </div>
              <a href="/">Settings</a>
              <a href="/">About</a>
              <a href="/" onClick={LogoutButton}>Logout</a>
            </div>
          </button>
        </li>
      </div>
    </nav>
  );
}
