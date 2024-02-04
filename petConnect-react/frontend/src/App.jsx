import "./App.css";
import ProfileModal from "./components/ProfileModal";
import { useAuth0 } from "@auth0/auth0-react";
import UserProfile from "./components/UserProfile";
import LoginButton from "./components/Login";
import LogoutButton from "./components/Logout";
import HomeRoute from "./components/HomeRoute";


function App() {
  return (
    <div>
      {!user && <LoginButton />}
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && user && (
        <>
          <LogoutButton />
          <UserProfile />
          <HomeRoute />
        </>
      )}
      {modal && (
        <ProfileModal
          selectedPet={selectedPet}
          hideModal={onCloseModal}
          showModal={showModal}
        />
      )}
    </div>
  );
}

export default App;
