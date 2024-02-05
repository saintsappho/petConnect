import './App.css'
// components
import HomeRoute from './components/HomeRoute'
import LoginButton from './components/Login'
import LogoutButton from './components/Logout'
import UserProfile from './components/UserProfile'
import Loading from './components/Loading'
import PetProfile from './components/PetProfile';

// dependencies
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from './components/modals/Modal';
import axios from "axios";

//styles
import "./App.css";
import "./styles/Modal.scss"
// hooks
import useFetchData from './hooks/useFetchData'

function App() {
  const { user, isLoading, isAuthenticated, error } = useAuth0();
  const [modal, setModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [petData, setPetData] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [modalContent, setModalContent] = useState([]);

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

  // ensure modal is closed when user logs in/out
  useEffect(() => {
    setModal(false);
    setSelectedPet(null);
    setModalContent([]);
  }, [user]);

 // handle 
  const handlePetListSelect = (event) => {
    event.preventDefault(); 
    const petId = event.target.value;
    const pet = petData.find(pet => pet.pet_id === Number(petId));
    setSelectedPet(pet);    
    console.log('selected pet: ', pet);
    setModalContent(<PetProfile selectedPet={selectedPet} />);
    openModal(event);
  }

  const openCurrentUserModal = (event) => {
    event.preventDefault();
    setModalContent(<UserProfile user={user} />);
    console.log('user modal: ', modalContent);
    openModal(event);
  };

  const openModal = (event) => {
    event.preventDefault();
    setModal(true);
    console.log('setModal', modal)};

  const closeModal = () => {
    setModal(false);
    setModalContent([]);
  };

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
          <HomeRoute openCurrentUserModal={openCurrentUserModal} petData={petData} handlePetListSelect={handlePetListSelect} />
        </>
      )}
    </div>
    {modal && (
        <Modal
          selectedPet={selectedPet}
          modal={modal}
          content={modalContent}
          closeModal={closeModal}
        />
      )}
  </div>    
  );
}

export default App;
