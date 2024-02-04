import "../styles/TopNav.scss"
// import { useState } from "
// import React from 'react';
//The NavBar component will be a fixed navigation bar at the top of the page. It will contain links to the home page, the scheduling page, the messaging page, and either the login page or the user's profile page and logout button.
//The NavBar will be visible on all pages of the app, and will be responsive to different screen sizes.

export default function Navbar({ petData, handleListSelect }) {
  // State for pet list selection


  return (
    <nav className="top-nav-bar">

      <div className="top-nav-bar__logo">
      </div>

      <div className="top-nav-bar__links">
      <li className="top-nav-bar__item">
        <a href="/">Home</a>
      </li>

      <li className="top-nav-bar__item">
        <a href="/about">About</a>
      </li>

      <li className="top-nav-bar__item">
        <a href="/">Profile</a>
      </li>

      <li>
      <form onSubmit={e => e.preventDefault()}> 
        <select name="pets" onChange={handleListSelect}>
        <option value="">Select a pet</option>
          {petData.map(pet => (
            <option key={pet.pet_id} value={pet.pet_id}>{pet.name}</option>
          ))}
        </select>
      </form>
      </li>

      <li className="top-nav-bar__item">
        <a href="/">if login "Profile" and "Logout"</a>
      </li>
      </div>
    </nav>
  );
}
