import { useState, useEffect, useInsertionEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useFetchData from "../hooks/useFetchData";
import LoginButton from "./Login";
import NewPost from "./partials/newpost/_NewPost";
import Feed from "./partials/_Feed";
import NavBar from "./NavBar";
import PetPointsFeedWidget from "./petPoints/PetPointsFeedWidget";
import "../styles/TopNav.scss";
import "../styles/BubblyButton.scss";
import "../styles/HomeRoute.css";
import "../styles/UserProfile.css";

export default function HomeRoute({ onPetSelect, petData, setShowAddPetForm, handlePetListSelect, setLatestActivity, showAddPetForm, ranking, setRanking, latestActivity, openCurrentUserModal, setPetData, achievements, setAchievements, closeModal, userId, handleSetPetPoints, petPoints, setPetPoints }) {
//calling all backend routes to check if they are working and ensure data is being sent to the frontend
  const [create, setCreate] = useState(false);
  const { isLoading, error, user } = useAuth0();
  const [posts, setPosts] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [onDelete, setOnDelete] = useState(false);
  const [hide, setHide] = useState(false);
  
  const handleDelete = () => {
    setOnDelete(!onDelete);
  };

  const handleHide = () => {
    setHide(!hide);
  };
  
  var animateButton = function (e) {
    e.preventDefault;
    e.target.classList.remove('animate');
    e.target.classList.add('animate');
    setTimeout(function () {
      e.target.classList.remove('animate');
    }, 700);
  };
  var bubblyButtons = document.getElementsByClassName("bubbly-button");
  for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
  }

  
  useEffect(() => { // setPetData dynamically, available for refreshing
    fetch("http://localhost:8080/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
    }, [user, onDelete])

    // console.log(user)
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
              setShowAddPetForm={setShowAddPetForm}
              showAddPetForm={showAddPetForm}
              handleHide={handleHide}
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
                <h3>Welcome to PetConnect, {user.name}!</h3>
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

        <Feed hide={hide} onSuccess={handleDelete} posts={posts} showAddPetForm={showAddPetForm} setPosts={setPosts} error={fetchError} user={user}/>
        <PetPointsFeedWidget create={create} setCreate={setCreate} latestActivity={latestActivity} setLatestActivity={setLatestActivity} achievements={achievements} setAchievements={setAchievements} handleSetPetPoints={handleSetPetPoints} petPoints={petPoints} setPetPoints={setPetPoints} userId={userId} ranking={ranking} setRanking={setRanking}/>

        <footer>
          <p>
            Created by: <a href="Team13">Team13</a>
          </p>
        </footer>
      </div>
    );
  }