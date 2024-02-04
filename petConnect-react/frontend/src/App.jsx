// dependencies
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
// components
import HomeRoute from "./components/HomeRoute";
import Login from "./components/Login";
//styles
import "./App.css";

function App() {
  return (
    <div>
      {/* <HomeRoute /> */}
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
  );
}

export default App;
