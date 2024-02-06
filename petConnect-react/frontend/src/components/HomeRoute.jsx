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
import UserProfile from "./UserProfile";

//hooks
import useFetchData from "../hooks/useFetchData";
// styles
import "../styles/TopNav.scss";
import "../styles/BubblyButton.scss";
import "../styles/HomeRoute.css";
// import { use } from "../../../backend/routes/users.js";

export default function HomeRoute({
  isModalOpen,
  closeModal,
  onPetSelect,
  petData,
  handleListSelect,
}) {
  //calling all backend routes to check if they are working and ensure data is being sent to the frontend
  const [create, setCreate] = useState(false);
  const { isLoading, error, user, isAuthenticated } = useAuth0();
  //establishing posts/errors in state.
  const [posts, setPosts] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useFetchData("http://localhost:8080/posts", "posts", setPosts, setFetchError);

  // // log to ensure posts are being fetched dynamically
  // useEffect(
  //   (posts) => {
  //     console.log("posts array has changed:", posts);
  //   },
  //   [posts.length],
  // );

  // // example hook usage for backend routes to fetch data stored here. 
  // // feel free to copy and paste
  // useFetchData("http://localhost:8080/users/", "users", setUsers, setFetchError);
  // useFetchData("http://localhost:8080/posts/", "posts", setPosts, setFetchError);
  // useFetchData("http://localhost:8080/pets/", "pets", setPets, setFetchError);
  // useFetchData("http://localhost:8080/events/", "events", setEvents, setFetchError);
  // useFetchData("http://localhost:8080/chats/", "chats", setChats, setFetchError);
  // useFetchData("http://localhost:8080/messages/", "messages", setMessages, setFetchError);
  // useFetchData("http://localhost:8080/comments/", "comments", setComments, setFetchError);
  // useFetchData("http://localhost:8080/likes/", "likes", setLikes, setFetchError);
  // useFetchData("http://localhost:8080/attendees/", "attendees", setAttendees, setFetchError);
  // useFetchData("http://localhost:8080/follows/", "follows", setFollows, setFetchError);

  return (
    <div className="HomeRoute">
      <header>
        {petData && (
          <NavBar
            petData={petData}
            onPetSelect={onPetSelect}
            handleListSelect={handleListSelect}
          />
        )}
      </header>

      <div>
        {!user && <LoginButton className="login-button-login-screen" />}
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && user && (
          <>
            <div className="title-card">
              <h1>Welcome to PetConnect, {user.name}</h1>
              <button
                className="bubbly-button"
                onClick={() => setCreate(!create)}
              >
                New Post
              </button>
            </div>
            {create && (
              <div className="new-post-card">
                <NewPost setPosts={setPosts} useFetchData={useFetchData} setFetchError={setFetchError}/>
              </div>
            )}
          </>
        )}
      </div>

      <Feed posts={posts} setPosts={setPosts} error={fetchError} />
      <UserProfile />

      <footer>
        <p>
          Created by: <a href="Team13">Team13</a>
        </p>
      </footer>
    </div>
  );
}
