import "./App.css";
import ProfileModal from "./components/ProfileModal";
import { useAuth0 } from "@auth0/auth0-react";
import UserProfile from "./components/UserProfile";
import LoginButton from "./components/Login";
import LogoutButton from "./components/Logout";
import HomeRoute from "./components/HomeRoute";
import { useState } from "react";


function App() {
  const { user, isLoading, error } = useAuth0();
  const [modal, setModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const petData = [
    { pet_id: 1, name: 'Max', age: 5 },
    { pet_id: 2, name: 'Snoopy', age: 3 },
    { pet_id: 3, name: 'Benji', age: 1 }
  ];

  const handleListSelect = (event) => {
    event.preventDefault(); 
    const petId = event.target.value;
    const pet = petData.find(pet => pet.pet_id === Number(petId));
    onPetSelect(pet);
  }
  const closeModal = () => {
    setModal(false);
  };
  const openModal = () => {
    setModal(true);
  };
  const onPetSelect = (pet) => {
    setSelectedPet(pet);    
    openModal(pet);
    console.log(pet);
  }
  
  return (
    <div>
      {!user && <LoginButton />}
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && user && (
        <>
          <LogoutButton />
          <UserProfile />
          <HomeRoute petData={petData} onPetSelect={onPetSelect} />
        </>
      )}
      {modal && (
        <ProfileModal
          handleListSelect={handleListSelect}
          selectedPet={selectedPet}
          openModal={openModal}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default App;
