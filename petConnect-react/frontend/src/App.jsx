import './App.css'
// components
import HomeRoute from './components/HomeRoute'
import LoginButton from './components/Login'
import LogoutButton from './components/Logout'
import UserProfile from './components/UserProfile'
import Loading from './components/Loading'
// dependencies
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileModal from './components/PetProfileModal';
import axios from "axios";


//styles
import "./App.css";
import useFetchData from './hooks/useFetchData'

function App() {
  const { user, isLoading, isAuthenticated, error } = useAuth0();
  const [modal, setModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [petData, setPetData] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  // animation for fancy button
  var animateButton = function(e) {
    e.preventDefault;
    e.target.classList.remove('animate');
    e.target.classList.add('animate');
    setTimeout(function(){
      e.target.classList.remove('animate');
    },700);
  };
  var bubblyButtons = document.getElementsByClassName("bubbly-button");
  for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
  }

  // fetch user's pet data for list
  useFetchData("http://localhost:8080/pets", "pets", setPetData, setFetchError);

  const handleListSelect = (event) => {
    event.preventDefault(); 
    const petId = event.target.value;
    const pet = petData.find(pet => pet.pet_id === Number(petId));
    console.log('selected pet: ', pet);
    onPetSelect(pet);
  }
  const closeModal = () => {
    setModal(false);
    setSelectedPet(null);
  };
  const openModal = () => {
    setModal(true);
  };
  const onPetSelect = (pet) => {
    setSelectedPet(pet);
    openModal(pet);
  }
  useEffect(() => {
    setModal(false);
    setSelectedPet(null);
  }, [user]);




  // useEffect(() => {
  //   if (isAuthenticated) {
  //     axios.post('http://localhost:8080/users/', { user }).then(response => {
  //       console.log('response', response);
  //     });
  //   }
  // }, [isAuthenticated, user]);
  
  return (
    <div className="App">
    <div>
      {!user && <LoginButton className="login-button-login-page"/>}
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <Loading />}
      {!error && !isLoading && user && (
        <>
          <HomeRoute petData={petData} handleListSelect={handleListSelect} />
        </>
      )}
    </div>
    {modal && (
        <ProfileModal
          handleListSelect={handleListSelect}
          selectedPetData={selectedPet}
          petData={petData}
          openModal={openModal}
          closeModal={closeModal}
        />
      )}
  </div>    
  );
}

export default App;
