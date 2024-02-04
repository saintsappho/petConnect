import './App.css'
// components
import HomeRoute from './components/HomeRoute'
import LoginButton from './components/Login'
import LogoutButton from './components/Logout'
import UserProfile from './components/UserProfile'
// dependencies
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";


//styles
import "./App.css";

function App() {
  const { user, isLoading, isAuthenticated, error } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      axios.post('http://localhost:8080/users/', { user }).then(response => {
        console.log('response', response);
      });
    }
  }, [isAuthenticated, user]);
  
  return (
<div> 
  {!user && <LoginButton />}
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && user && (
        <>
          <HomeRoute />
          <LogoutButton />
          <UserProfile />
        </>
      )}
    </div>
  );
}

export default App;
