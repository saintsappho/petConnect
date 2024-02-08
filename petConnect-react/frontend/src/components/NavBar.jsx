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
        <li className="top-nav-bar__item">
          <a href="/">Home</a>
        </li>
        <li className="top-nav-bar__item">
          <a href="/">About</a>
        </li>
        <li className="top-nav-bar__item">
          <button onClick={openCurrentUserModal}>{user.user_photo_url}</button>
        </li>
        <li className="top-nav-bar__item">
          <select name="pets" onChange={handlePetListSelect}>
            <option value="">Select a pet</option>
            {petData &&
              (petData.map((pet) => (
                <option key={pet.pet_id} value={pet.pet_id}>
                  {pet.name}
                </option>
              )))}
          </select>
        </li>
        <li className="top-nav-bar__item">
          <LogoutButton />
        </li>

      </div>
    </nav>
  );
}
