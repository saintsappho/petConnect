import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import PetListWidget from './PetListWidget.jsx';
import DirectMessages from "./DirectMessages";

//User Profile component will be a modal that pops up when the user clicks on "profile" in the top right corner of the NavBar. It will display the user's name, email, phone number, and a list of their pets.
//The user's name, email, and phone number will be hardcoded for now, but the list of pets will be dynamic and will be pulled from the database.
//the user's information will be able to be edited by the user, and the user will be able to add or remove pets from their list.

export default function UserProfile({userId, handleConversationClick, petData}) {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isDirectMessagesOpen, setDirectMessagesOpen] = useState(false);

  const openDirectMessages = () => {
    setDirectMessagesOpen(true);
  };
  const closeDirectMessages = () => {
    setDirectMessagesOpen(false);
  };

  const listPayload = "currentUser";

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
        <div className="user-profile-header">
          <img className="user-profile-image" src={user.picture} alt={user.name} />
          <h1 className="user-profile-name">{user.name}</h1>
          <h2>{user.location}</h2>
          <table className="user-profile-buttons">
            <thead>
              <tr>
                <td>
                  <button id="friendButton" onClick={() => { console.log("add-friend") }}>Add Friend</button>
                </td>
                <td>
                  <button id="messageButton" onClick={openDirectMessages}>Message</button>
                </td>
              </tr>
            </thead>
          </table>
          <h2>{user.location}</h2>
          <article id="bio">&quot;I&apos;m {user.name} and I own 3 pets, a golden retriever named Max, a cat named Benji, and a ferret named Snoopy!&quot;</article>
        </div>
        <div className="user-profile-body">
          <h2 id="pet-section-title">Pets!</h2>
          <div className="pet-list-widget">
          <PetListWidget petData={petData} listPayload={listPayload} />
          </div>
        </div>
        {isDirectMessagesOpen && <DirectMessages onClose={closeDirectMessages} />}
      </div>
    )
  );
}
