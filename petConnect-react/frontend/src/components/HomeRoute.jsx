import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import Login from './components/Login'
import LoginButton from "./Login";
import NewPost from "./partials/newpost/_NewPost";
import Feed from "./partials/_Feed";
import NavBar from "./NavBar"
//hooks
import useFetchData from "../hooks/useFetchData";
// styles
import "../styles/TopNav.scss";
import "../styles/BubblyButton.scss";
import "../styles/HomeRoute.css";
import "../styles/UserProfile.css";


export default function HomeRoute({ onPetSelect, petData, handlePetListSelect, openCurrentUserModal, setPetData }) {
  //calling all backend routes to check if they are working and ensure data is being sent to the frontend
  const [create, setCreate] = useState(false);
  const { isLoading, error, user, isAuthenticated } = useAuth0();
  //establishing posts/errors in state.
  const [posts, setPosts] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useFetchData("http://localhost:8080/posts", "posts", setPosts, setFetchError);  
  // useFetchData("http://localhost:8080/users", "users", setUsers, setFetchError); 
  useFetchData("http://localhost:8080/pets", "pets", setPetData, setFetchError);

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
      <nav>
        {petData && (
          <NavBar
            petData={petData}
            onPetSelect={onPetSelect}
            handlePetListSelect={handlePetListSelect}
            user={user}
            openCurrentUserModal={openCurrentUserModal}
          />
        )}
      </nav>


        {!user && <LoginButton className="login-button-login-screen" />}
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && user && (
          
            <div className="title-card">
              <h2>Welcome to PetConnect, {user.name}!</h2>
              <button className="bubbly-button" onClick={() => setCreate(!create)}>
                New Post
              </button>
            </div>
        )}
        {create && (
          <div className="new-post-card">
            <NewPost setPosts={setPosts} useFetchData={useFetchData} setFetchError={setFetchError}/>
          </div>
        )}

      <Feed posts={posts} setPosts={setPosts} error={fetchError} />

      <footer>
        <p>
          Created by: <a href="Team13">Team13</a>
        </p>
      </footer>
    </div>
    
  );
}
