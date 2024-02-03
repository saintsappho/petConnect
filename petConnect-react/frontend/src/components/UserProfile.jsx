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
        </div>
    </aside>

  );
};

export default UserProfile;