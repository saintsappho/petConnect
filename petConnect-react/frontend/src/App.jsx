import { useState } from 'react'
import './App.css'
import HomeRoute from './components/HomeRoute'
import LoginButton from './components/Login'
import LogoutButton from './components/Logout'
import UserProfile from './components/UserProfile'
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const { user, isLoading, error } = useAuth0();
  
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
  )
}

export default App;