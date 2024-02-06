import "../styles/TopNav.scss"
import LogoutButton from "./Logout";
import Modal from "./modals/Modal.jsx";

// import { useState } from "
// import React from 'react';
//The NavBar component will be a fixed navigation bar at the top of the page. It will contain links to the home page, the scheduling page, the messaging page, and either the login page or the user's profile page and logout button.
//The NavBar will be visible on all pages of the app, and will be responsive to different screen sizes.

export default function Navbar({ petData, handlePetListSelect, openCurrentUserModal, user }) {
  return (
    <nav className="top-nav-bar">

      <div className="top-nav-bar__logo">
      </div>

      <div className="top-nav-bar__title">
        <h1>Petconnect</h1>
      </div>

      <div className="top-nav-bar__links">
      <li className="top-nav-bar__item">
        <a href="/">Home</a>
      </li>

      <li className="top-nav-bar__item">
        <link path="/about" ele>
      </li>

      <li>
      <form onSubmit={e => e.preventDefault()}> 
        <select name="pets" onChange={handlePetListSelect}>
        <option value="">Select a pet</option>
          {petData.map(pet => (
            <option key={pet.pet_id} value={pet.pet_id}>{pet.name}</option>
          ))}
        </select>
      </form>
      </li>

      <li className="top-nav-bar__item">
        <form onSubmit={e => e.preventDefault()}>
        <button onClick={openCurrentUserModal} >{user.name}</button>
        </form>
      </li>

      <li className="top-nav-bar__item">
        <LogoutButton />
      </li>

      </div>
    </nav>
  );
}
