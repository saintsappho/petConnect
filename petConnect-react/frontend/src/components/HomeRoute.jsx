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
//hooks 
import useFetchData from "../hooks/useFetchData";
// styles
import "../styles/TopNav.scss";
// import './App.css'

export default function HomeRoute({ isModalOpen, closeModal, onPetSelect, petData }) {
  //calling all backend routes to check if they are working and ensure data is being sent to the frontend
  const [create, setCreate] = useState(false);

  const [posts, setPosts] = useState([]);
  // const [petData, setPetData] = useState([]);

  // const petData = [
  //   { pet_id: 1, name: "Max", age: 5 },
  //   { pet_id: 2, name: "Snoopy", age: 3 },
  //   { pet_id: 3, name: "Benji", age: 1 },
  // ];

  const openModal = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };
  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  // const onPetSelect = (pet) => {
  //   setSelectedPet(pet);
  //   openModal(pet);
  //   console.log(pet);
  // };

  
  useEffect(() => {
    // fetchData("http://localhost:8080/users/", "users");
    useFetchData("http://localhost:8080/posts/", "posts");
    // fetchData("http://localhost:8080/pets/", "pets");
    // fetchData("http://localhost:8080/events/", "events");
    // fetchData("http://localhost:8080/chats/", "chats");
    // fetchData("http://localhost:8080/messages/", "messages");
    // fetchData("http://localhost:8080/comments/", "comments");
    // fetchData("http://localhost:8080/likes/", "likes");
    // fetchData("http://localhost:8080/attendees/", "attendees");
    // fetchData("http://localhost:8080/follows/", "follows");
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
      <header>
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
        <Feed fetchData={fetchData} />
      </div>

      <footer>
        <p>
          Created by: <a href="Team13">Team13</a>
        </p>
      </footer>
    </div>
  )}