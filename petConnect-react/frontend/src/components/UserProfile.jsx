import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import LogoutButton from "./Logout";
import DirectMessages from "./DirectMessages";

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
        <img className="profile__image" src={user.picture} alt={user.name} />
      </div>
        <div className="profile__name">
          <h1>{user.name}</h1>
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
          <h2>{user.location}</h2>
          <article>"I'm {user.name} and I own 3 pets, a golden retriever named Max, a cat named Benji, and a ferret named Snoopy!"</article>
        </div>

      {isDirectMessagesOpen && <DirectMessages onClose={closeDirectMessages} />}
    </aside>
    )
  )
}
