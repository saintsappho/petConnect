import NavBar from "./partials/_NavBar";
import PetPost from "./partials/_PetPost";
import { useState } from "react";
// import './App.css'
// import Login from './components/Login'
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/TopNav.scss";
import LoginButton from "./Login";
import LogoutButton from "./Logout";
import NewPost from "./partials/_NewPost";
import { useEffect } from "react";
import axios from "axios";
import UserProfile from "./UserProfile";

export default function HomeRoute() {
  //calling all backend routes to check if they are working and ensure data is being sent to the frontend
  useEffect(() => {
    const fetchData = async (url, target) => {
      try {
        const response = await axios.get(url);
        console.log(`Data from ${target}:`, response.data);
      } catch (error) {
        console.error(`Error fetching data from ${target}:`, error.message);
      }
    };

    fetchData("http://localhost:8080/users/", "users");
    fetchData("http://localhost:8080/posts/", "posts");
    fetchData("http://localhost:8080/pets/", "pets");
    fetchData("http://localhost:8080/events/", "events");
    fetchData("http://localhost:8080/chats/", "chats");
    fetchData("http://localhost:8080/messages/", "messages");
    fetchData("http://localhost:8080/comments/", "comments");
    fetchData("http://localhost:8080/likes/", "likes");
    fetchData("http://localhost:8080/attendees/", "attendees");
    fetchData("http://localhost:8080/follows/", "follows");
  }, []);
 
  const { isLoading, error, user } = useAuth0();
  return (
    <div>
      <NewPost />
      <div>
        {!user && <LoginButton />}
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && user && (
          <>
            <LogoutButton />
            <Profile />
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
