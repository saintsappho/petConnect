import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Login";
import NewPost from "./partials/newpost/_NewPost";
import Feed from "./partials/_Feed";
import NavBar from "./NavBar"
import useFetchData from "../hooks/useFetchData";
import PetPointsFeedWidget from "./petPoints/PetPointsFeedWidget";
import "../styles/TopNav.scss";
import "../styles/BubblyButton.scss";
import "../styles/HomeRoute.css";
import "../styles/UserProfile.css";

export default function HomeRoute({ onPetSelect, petData, handlePetListSelect, openCurrentUserModal, setPetData, closeModal, userId }) {
//calling all backend routes to check if they are working and ensure data is being sent to the frontend
  const [create, setCreate] = useState(false);
  const { isLoading, error, user } = useAuth0();
  const [posts, setPosts] = useState([]);
  const [fetchError, setFetchError] = useState(null);

    useFetchData("http://localhost:8080/posts", "posts", setPosts, setFetchError);
    console.log(user)
    return (
      <div className="HomeRoute">
        {create && <div className="overlay"></div>}
        <header>
          {petData && (
            <NavBar
              petData={petData}
              onPetSelect={onPetSelect}
              handlePetListSelect={handlePetListSelect}
              closeModal={closeModal}
              user={user}
              userId={userId}
              openCurrentUserModal={openCurrentUserModal}
            />
          )}
        </header>

        <div>
          {!user && <LoginButton className="login-button-login-screen" />}
          {error && <p>Authentication Error</p>}
          {!error && isLoading && <><p>Loading...</p><img src="../assets/petProfileHead.gif"></img></>}
          {!error && !isLoading && user && (
            <>
              <div className="title-card">
                <h2>Welcome to PetConnect, {user.name}!</h2>
                <button className="bubbly-button" onClick={() => setCreate(!create)}>
                  New Post
                </button>
              </div>
              {create && (
                <div className="new-post-card">
                  <NewPost create={create} setCreate={setCreate} setPosts={setPosts} useFetchData={useFetchData} setFetchError={setFetchError}/>
                </div>
              )}
            </>
          )}
        </div>

        <Feed posts={posts} setPosts={setPosts} error={fetchError} />
        <PetPointsFeedWidget userId={userId}/>

        <footer>
          <p>
            Created by: <a href="Team13">Team13</a>
          </p>
        </footer>
      </div>
    );
  }