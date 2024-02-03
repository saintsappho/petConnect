// import React from 'react';
//The NavBar component will be a fixed navigation bar at the top of the page. It will contain links to the home page, the scheduling page, the messaging page, and either the login page or the user's profile page and logout button.
//The NavBar will be visible on all pages of the app, and will be responsive to different screen sizes.
export default function NavBar() {
  return (
    <nav className="top-nav-bar">

      <li className="top-nav-bar__logo">
        <a href="/">
          <img src="../RoundLogo.png"></img>
        </a>
      </li>

      <li className="top-nav-bar__item">
        <a href="/">Home</a>
      </li>

      <li className="top-nav-bar__item">
        <a href="/about">About</a>
      </li>

      <li className="top-nav-bar__item">
        <a href="/">Profile</a>
      </li>

      <li className="top-nav-bar__item">
        <a href="/"><select name="pets">
          <option value="dog">Maxwell</option>
          <option value="cat">Benji</option>
          <option value="ferret">Snoopy</option>
        </select></a>

      </li>
      {/* {!user && <LoginButton />}
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && user && (
        <>
          
          <LogoutButton />
          <UserProfile />
          </>
      )} */}
    </nav>
  );
}
