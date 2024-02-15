/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import PetListWidget from './PetListWidget.jsx';
import DirectMessages from "./DirectMessages";
import PetPointsProfileWidget from './petPoints/PetPointsProfileWidget.jsx';

//User Profile component will be a modal that pops up when the user clicks on "profile" in the top right corner of the NavBar. It will display the user's name, email, phone number, and a list of their pets.
//The user's name, email, and phone number will be hardcoded for now, but the list of pets will be dynamic and will be pulled from the database.
//the user's information will be able to be edited by the user, and the user will be able to add or remove pets from their list.

export default function UserProfile({ userId, handlePetListSelect, handleConversationClick, latestActivity, setLatestActivity, petData, handleSetPetPoints, achievements,petPoints }) {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // Sets payload for pet list widget
  const listPayload = "currentUser";

  // If user is loading, display loading message
  if (isLoading) {
    return (
      <div>
        Loading ...<br />
        <img
          className="loading-cat"
          src="./src/assets/petProfileHead.gif"
          alt="Pet Profile Picture"
        />
      </div>
    );
  }

  return (
    isAuthenticated && (
      <div className="user-profile-container">
        <div className="user-profile-top">
          <div className="user-profile-header">
            <img className="user-profile-image" src={user.picture} alt={user.name} />
            <h1 className="user-profile-name">{user.name}</h1>
            <h2 className="user-profile-location">Alberta, Canada</h2>
            <table className="user-profile-buttons">
              <thead>
                <tr>
                  {!userId && (
                    <td>
                      <button id="friendButton" onClick={() => { console.log("add-friend") }}>Add Friend</button>
                    </td>
                  )}
                </tr>
              </thead>
            </table>
            <h2>{user.location}</h2>
            <article id="bio">&quot;Hi I&apos;m {user.name}. {user.bio}&quot;</article>
          </div>

          <div className="profile-pet-points">
            <PetPointsProfileWidget latestActivity={latestActivity} setLatestActivity={setLatestActivity} achievements={achievements} handleSetPetPoints={handleSetPetPoints} petPoints={petPoints} userId={userId} />
          </div>
        </div>

        <div className="user-profile-body">
          <div className="pet-list-widget">
          <PetListWidget handlePetListSelect={handlePetListSelect} inspect={false} dynClass={"navbar"} petData={petData} listPayload={listPayload} userId={userId} divClass="user-pet-widget" />
          </div>
        </div>
      </div>
    )
  );
}
