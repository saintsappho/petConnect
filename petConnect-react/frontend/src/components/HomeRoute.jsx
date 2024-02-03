import NavBar from "./partials/_NavBar";
import PetPost from "./partials/_PetPost";
import { useState } from 'react'
// import './App.css'
// import Login from './components/Login'
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/TopNav.scss";
import LoginButton from "./Login";
import LogoutButton from "./Logout";
import UserProfile from "./UserProfile";

export default function HomeRoute() {
  const { isLoading, error, user } = useAuth0();
  return (
    <div>
      <div> 
  {!user && <LoginButton />}
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && user && (
        <>
          
          <LogoutButton />
          <UserProfile />
          </>
      )}
</div>
      {/* <head>
        <title>PetConnect</title>
      </head>

      <header>
        <NavBar />
      </header>

      <body>
        <img src="../public/Logo.png"></img>
        <div className="dashboard">
          <PetPost />
          <PetPost />
          <PetPost />
        </div>
      </body>

      <footer>
        <p>
          Created by: <a href="Team13">Team13</a>
        </p>
      </footer> */}
    </div>
  );
}
