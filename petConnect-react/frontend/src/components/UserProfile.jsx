import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import DirectMessages from "./DirectMessages";

export default function UserProfile ({ userId, handleConversationClick }) {
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
    <div className="user-profile-container">
        <div className="profile__header">
        <img className="profile__image" src={user.picture} alt={user.name} />
          <h1 className="profile__name">{user.name}</h1>
          <table className="profile__buttons"> 
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
            <article id="bio" >&quot;I&apos;m {user.name} and I own 3 pets, a golden retriever named Max, a cat named Benji, and a ferret named Snoopy!&quot;</article>
        </div>

      {isDirectMessagesOpen && <DirectMessages onClose={closeDirectMessages} />}
    </div>
    )
  )
}
