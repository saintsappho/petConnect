import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import LogoutButton from "./Logout";

const UserProfile = () => {


  return (

    <aside>
      <div className="profile">
        <img className="profile__image" src="./src/assets/profile-hex.png" />
      </div>
        <div className="profile__name">
          <h1>Ashley Tree</h1>
          <h2>Los Angeles, CA</h2>
          <table> 
            <th><button onClick="add-friend">Friend</button></th>
            <th><button onClick="message">Message</button></th>
          </table>
          <article>"I'm Ashley and I own 3 pets, a golden retriever named Max, a cat named Benji, and a ferret named Snoopy!"</article>
          
        </div>
    </aside>

  );
};

export default UserProfile;
