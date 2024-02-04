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

function App() {
  const { user, isLoading, isAuthenticated, error } = useAuth0();
  const [modal, setModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
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
  

  const petData = [
    { pet_id: 1, name: 'Max', age: 5 },
    { pet_id: 2, name: 'Snoopy', age: 3 },
    { pet_id: 3, name: 'Benji', age: 1 }
  ];

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
          selectedPet={selectedPet}
          openModal={openModal}
          closeModal={closeModal}
        />
      )}
  </div>    
  );
}

export default App;
