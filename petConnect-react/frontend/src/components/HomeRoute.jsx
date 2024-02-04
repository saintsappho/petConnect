
import NavBar from "./NavBar";
import PetPost from "./partials/_PetPost";
import { useState } from "react";

// import Login from './components/Login'
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/TopNav.scss";
import LoginButton from "./Login";
import NewPost from "./partials/newpost/_NewPost";
import Feed from "./partials/_Feed";
import { useEffect } from "react";
import axios from "axios";
import ProfileModal from "./PetProfileModal.jsx";
import UserProfile from './UserProfile';

//hooks 
import useFetchData from "../hooks/useFetchData";
// styles
import "../styles/TopNav.scss";
import "../styles/BubblyButton.scss"
import "../styles/HomeRoute.css";


export default function HomeRoute({ isModalOpen, closeModal, onPetSelect, petData, handleListSelect }) {
  //calling all backend routes to check if they are working and ensure data is being sent to the frontend
  const [create, setCreate] = useState(false);
  const { isLoading, error, user, isAuthenticated } = useAuth0();
  //Backend routes to fetch data stored here.

  // useFetchData("http://localhost:8080/users/", "users");
  // useFetchData("http://localhost:8080/posts/", "posts");
  // useFetchData("http://localhost:8080/pets/", "pets");
  // useFetchData("http://localhost:8080/events/", "events");
  // useFetchData("http://localhost:8080/chats/", "chats");
  // useFetchData("http://localhost:8080/messages/", "messages");
  // useFetchData("http://localhost:8080/comments/", "comments");
  // useFetchData("http://localhost:8080/likes/", "likes");
  // useFetchData("http://localhost:8080/attendees/", "attendees");
  // useFetchData("http://localhost:8080/follows/", "follows");

  
    
    // useEffect(() => {
    //   if (isAuthenticated) {
    //     console.log('User from Homeroute', user);
    //     axios.post('http://localhost:8080/', user).then( response => {
    //       console.log('response', response);
    //     });
    //   }
    // }, [isAuthenticated]);
  
  return (
    <div className="HomeRoute">
      <header>
        {petData && <NavBar petData={petData} onPetSelect={onPetSelect} handleListSelect={handleListSelect} />}
        <div className="title-card">
          <h1>Welcome to PetConnect</h1>
          <button className="bubbly-button" onClick={() => setCreate(!create)}>New Post</button>
        </div>
        {create && <div className="new-post-card"><NewPost /></div>}
        
        <div>
          {!user && <LoginButton className="login-button-login-screen" />}
          {error && <p>Authentication Error</p>}
          {!error && isLoading && <p>Loading...</p>}
          {!error && !isLoading && user && (
            <>

            </>
          )}
        </div>
      </header>

      <Feed />
      <UserProfile />
      
      <footer>
        <p>
          Created by: <a href="Team13">Team13</a>
        </p>
      </footer>
    </div>
  )}