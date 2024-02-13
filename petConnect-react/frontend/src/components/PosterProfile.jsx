/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import PetListWidget from "./PetListWidget";
import "../styles/PosterProfile.scss";

export default function PosterProfile({ user }) {
  const { isAuthenticated, isLoading } = useAuth0();
  const [petData, setPetData] = useState([]);
  const listPayload = "currentUser";

  useEffect(() => {
    fetch(`http://localhost:8080/pets/${user.user_id}`)
      .then((response) => response.json())
      .then((data) => {
        setPetData(data[0]);
      });
  }, [user]);

  // If poster is loading, display loading message
  if (isLoading) {
    return (
      <div>
        Loading ...
        <br />
        <img
          className="loading-cat"
          src="./src/assets/petProfileHead.gif"
          alt="Pet Profile Picture"
        />
      </div>
    );
  }
  // console.log("user", user);
  return (
    isAuthenticated && (
      <div className="poster-profile-container">
        <div className="poster-profile-top">
          <div className="poster-profile-header">
            <img
              className="poster-profile-image"
              src={user.profile_picture}
              alt={user.username}
            />
            <h1 className="poster-profile-name">{user.username}</h1>
            <br />{" "}
            <table className="poster-profile-buttons">
              <thead>
                <tr>
                  <td>
                    <button
                      id="friendButton"
                      onClick={() => {
                        console.log("add-friend");
                      }}
                    >
                      Add Friend
                    </button>
                  </td>
                  <td>
                    <button
                      id="messageButton"
                      onClick={() => {
                        console.log("message");
                      }}
                    >
                      Message
                    </button>
                  </td>
                </tr>
              </thead>
            </table>
            <br />
            <article id="bio">
              &quot;Hi!, I&apos;m {user.username}. {user.bio}&quot;
            </article>
          </div>
          <div className="poster-profile-body">
            <div className="pet-list-widget">
              <PetListWidget
                dynClass={"inspect"}
                petData={petData}
                listPayload={listPayload}
                userId={user.user_id}
                divClass="poster-pet-widget"
                
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
