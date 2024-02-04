import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import LogoutButton from "./Logout";

export default function UserProfile () {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
    <aside>
      <div className="profile">
        <img className="profile__image" src="./src/assets/profile-hex.png" />
      </div>
        <div className="profile__name">
          <h1>Ashley Tree</h1>
          <h2>Los Angeles, CA</h2>
          <table> 
            <thead>
              <tr>
                <td>
                  <button onClick={()=>{console.log("add-friend")}}>Friend</button>
                </td>
                <td>
                  <button onClick={()=>{console.log("message")}}>Message</button>
                </td>
              </tr>
            </thead>
            
          </table>
          <article>"I'm Ashley and I own 3 pets, a golden retriever named Max, a cat named Benji, and a ferret named Snoopy!"</article>
        </div>
    </aside>
    )
  )
}
