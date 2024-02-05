import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import Login from './components/Login'
import LoginButton from "./Login";
import NewPost from "./partials/newpost/_NewPost";
import Feed from "./partials/_Feed";
import UserProfile from "./UserProfile";
import NavBar from "./NavBar"
//hooks
import useFetchData from "../hooks/useFetchData";
// styles
import "../styles/TopNav.scss";
import "../styles/BubblyButton.scss";
import "../styles/HomeRoute.css";
import "../styles/UserProfile.css";


export default function HomeRoute({
  onPetSelect,
  petData,
  handlePetListSelect,
  openCurrentUserModal,
}) {
  //calling all backend routes to check if they are working and ensure data is being sent to the frontend
  const [create, setCreate] = useState(false);
  const { isLoading, error, user, isAuthenticated } = useAuth0();
  //establishing posts/errors in state.
  const [posts, setPosts] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useFetchData("http://localhost:8080/posts", "posts", setPosts, setFetchError);

  useEffect(
    (posts) => {
      console.log("posts array has changed:", posts);
    },
    [posts.length],
  );

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

  return (
    <div className="HomeRoute">
      <header>
        {petData && (
          <NavBar
            petData={petData}
            onPetSelect={onPetSelect}
            handlePetListSelect={handlePetListSelect}
            user={user}
            openCurrentUserModal={openCurrentUserModal}
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
              <h2>Welcome to PetConnect, {user.name}!</h2>
              <button
                className="bubbly-button"
                onClick={() => setCreate(!create)}
              >
                New Post
              </button>
            </div>
            {create && (
              <div className="new-post-card">
                <NewPost />
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
