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
import AuthProvider from './Auth0/AuthProvider';
import axios from "axios";

//styles
import "./App.css";
import "./styles/Modal.scss"
// hooks
import useFetchData from './hooks/useFetchData'

function App() {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [modal, setModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [petData, setPetData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [modalContent, setModalContent] = useState([]); 
  const [accessToken, setAccessToken] = useState(null); 
  const [userPets, setUserPets] = useState([]);
  const [error, setError] = useState(null);
  const userId = user?.sub;

  // Auth0 Token
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          setAccessToken(token);
        }
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    fetchAccessToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  // animation for fancy button
  var animateButton = function (e) {
    e.preventDefault;
    e.target.classList.remove('animate');
    e.target.classList.add('animate');
    setTimeout(function () {
      e.target.classList.remove('animate');
    }, 700);
  };
  var bubblyButtons = document.getElementsByClassName("bubbly-button");
  for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
  }

  // ensure modal is closed when user logs in/out
  useEffect(() => {
    setModal(false);
    setSelectedPet(null);
    setUserPets([]);
    setModalContent([]);
  }, [user]);

  // fetch user's pet data for list
  useFetchData("http://localhost:8080/pets", "pets", setPetData, setFetchError);

  

  // logic for navbar user pet list
  function handlePetListSelect(event) {
    event.preventDefault();
    const petId = event.target.value;
    const pet = petData.find(pet => pet.pet_id === Number(petId));
    setSelectedPet(pet);
    // console.log('selected pet: ', pet);
    if (pet === "Select a pet" || pet === undefined) {
      setModalContent([]);
      closeModal(event);
      return;
    } else {
      setModalContent(<PetProfile user={user} selectedPet={pet} />);
      console.log('modal content: ', modalContent);
      openModal(event)
    }
  }

  const openCurrentUserModal = (event) => {
    event.preventDefault();
    setSelectedPet(null);
    // console.log('pet data: ', petData);

    setPetData(petData);
    setModalContent(<UserProfile accessToken={accessToken} petData={petData} user={user} userId={userId} />);
    openModal(event);
  };

  const openModal = (event) => {
    event.preventDefault();
    setTimeout(() => {
      setModal(true);
    }, 1000);
  };

  const closeModal = () => {
    console.log('closing modal');
    setModalContent([]);
    setTimeout(() => {
      setModal(false);
    }, 1000);
  };


  return (
    <AuthProvider accessToken={accessToken}>
    <div className="App">
      <div>
        {!user && <LoginButton className="login-button-login-page" />}
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <Loading />}
        {!error && !isLoading && user && (
          <>
            <HomeRoute setPetData={setPetData} openCurrentUserModal={openCurrentUserModal} petData={petData} handlePetListSelect={handlePetListSelect} />
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
    </AuthProvider>
  );
}

export default App;
