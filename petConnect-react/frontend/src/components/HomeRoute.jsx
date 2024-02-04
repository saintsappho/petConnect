// dependencies
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
// components
import NavBar from "./NavBar";
import Feed from "./partials/_Feed";
import LoginButton from "./Login";
import LogoutButton from "./Logout";
import PetProfile from './PetProfile';
import PetPost from './partials/_PetPost';
import UserProfile from './UserProfile';
import Messages from './Messages';
import NewPost from "./partials/newpost/_NewPost";
import ProfileModal from "./ProfileModal";
// styles
import "../styles/TopNav.scss";
// import './App.css'

export default function HomeRoute({ isModalOpen, closeModal, onPetSelect, petData }) {
  //calling all backend routes to check if they are working and ensure data is being sent to the frontend
  const [create, setCreate] = useState(false);

  const fetchData = async (url, target) => {
    try {
      const response = await axios.get(url);
      console.log(`Data from ${target}:`, response.data);
    } catch (error) {
      console.error(`Error fetching data from ${target}:`, error.message);
    }
  };
  
  useEffect(() => {
    fetchData("http://localhost:8080/users/", "users");
    setPosts(fetchData("http://localhost:8080/posts/"));
    fetchData("http://localhost:8080/pets/", "pets");
    fetchData("http://localhost:8080/events/", "events");
    fetchData("http://localhost:8080/chats/", "chats");
    fetchData("http://localhost:8080/messages/", "messages");
    fetchData("http://localhost:8080/comments/", "comments");
    fetchData("http://localhost:8080/likes/", "likes");
    fetchData("http://localhost:8080/attendees/", "attendees");
    fetchData("http://localhost:8080/follows/", "follows");
  }, []);
 
  const { isLoading, error, user, isAuthenticated } = useAuth0();

    useEffect(() => {
      if (isAuthenticated) {
        console.log('user', user);
        axios.post('http://localhost:8080/users/', user).then( response => {
          console.log('response', response);
        });
      }
    }, [isAuthenticated]);
  
  return (
    <div>
      {!create && <button onClick={() => setCreate(!create)}>New Post</button>}
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
      <div>
        <h1>Welcome to PetConnect</h1>
      </div>
      <div> </div>

      <header>
        <NavBar petData={petData} onPetSelect={onPetSelect}/>

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
          <PetPost />
          <Messages />
        </div>

        <Feed fetchData={fetchData} />


      <footer>
        <p>
          Created by: <a href="Team13">Team13</a>
        </p>
      </footer>
    </div>
  )}