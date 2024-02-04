import NavBar from "./NavBar";
import PetPost from "./partials/_PetPost";
import { useState } from "react";
// import './App.css'
// import Login from './components/Login'
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/TopNav.scss";
import LoginButton from "./Login";
import LogoutButton from "./Logout";
import NewPost from "./partials/newpost/_NewPost";
import { useEffect } from "react";
import axios from "axios";
import ProfileModal from "./ProfileModal";
//hooks 
import useFetchData from "../hooks/useFetchData";
// styles
import "../styles/TopNav.scss";
// import './App.css'

export default function HomeRoute({ isModalOpen, closeModal, onPetSelect, petData }) {
  //calling all backend routes to check if they are working and ensure data is being sent to the frontend
  const [create, setCreate] = useState(false);
  const [posts, setPosts] = useState([]);

  
  useEffect(() => {
    // useFetchData("http://localhost:8080/users/", "users");
    useuseFetchData("http://localhost:8080/posts/", "posts");
    // useFetchData("http://localhost:8080/pets/", "pets");
    // useFetchData("http://localhost:8080/events/", "events");
    // useFetchData("http://localhost:8080/chats/", "chats");
    // useFetchData("http://localhost:8080/messages/", "messages");
    // useFetchData("http://localhost:8080/comments/", "comments");
    // useFetchData("http://localhost:8080/likes/", "likes");
    // useFetchData("http://localhost:8080/attendees/", "attendees");
    // useFetchData("http://localhost:8080/follows/", "follows");
  }, []);
 
  // useEffect(() => {
  //   axios.get("http://localhost:8080/pets/").then((response) => {
  //     setPetData(response.data);
  //   });
  // }, []);



  const { isLoading, error, user } = useAuth0();

  return (
    <div>
      <header>
        {console.log('petData', petData)}
        <NavBar petData={petData} onPetSelect={onPetSelect} />
        <div>
          <h1>Welcome to PetConnect</h1>
        </div>
        {!create && (
          <button onClick={() => setCreate(!create)}>New Post</button>
        )}
        {create && <NewPost />}
        <div>
          {!user && <LoginButton />}
          {error && <p>Authentication Error</p>}
          {!error && isLoading && <p>Loading...</p>}
          {!error && !isLoading && user && (
            <>
              <LogoutButton />
            </>
          )}
        </div>

        {isModalOpen && (
        <ProfileModal onClose={closeModal}>
        {/* Display the selected pet's info here */}
        <p>PETPROFILE</p>
      </ProfileModal>
        )}
      </header>

      <div>
        <UserProfile />
        <PetProfile />
        <Feed />
      </div>

      <footer>
        <p>
          Created by: <a href="Team13">Team13</a>
        </p>
      </footer>
    </div>
  )}