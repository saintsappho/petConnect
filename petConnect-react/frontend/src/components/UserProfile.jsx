import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import LogoutButton from "./Logout";
import DirectMessages from "./DirectMessages";
import "../styles/UserProfile.css";

export default function UserProfile () {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [isDirectMessagesOpen, setDirectMessagesOpen] = useState(false);

  const openDirectMessages = () => {
    setDirectMessagesOpen(true);
  };

  const closeDirectMessages = () => {
    setDirectMessagesOpen(false);
  };

  if (isLoading) {
    return <div>Loading ...<br/><img className="loading-cat" src="./src/assets/petProfileHead.gif" alt="Pet Profile Picture" /></div>;
  }

  return (
    isAuthenticated && (
    <aside>
      <div className="profile">
        <img className="profile__image" src="./src/assets/profile-hex.png" />
      </div>
        <div className="profile__name">
          <h1>Ashley Tree</h1>
          <table> 
            <thead>
              <tr>
                <td>
                  <button onClick={()=>{console.log("add-friend")}}>Friend</button>
                </td>
                <td>
                <button onClick={openDirectMessages}>Message</button>
                </td>
              </tr>
            </thead>
            
          </table>
          <h2>Los Angeles, CA</h2>
          <article>"I'm Ashley and I own 3 pets, a golden retriever named Max, a cat named Benji, and a ferret named Snoopy!"</article>
        </div>

      {isDirectMessagesOpen && <DirectMessages onClose={closeDirectMessages} />}
    </aside>
    )
  )
}
