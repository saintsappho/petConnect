/* eslint-disable no-unused-vars */
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
import useFetchData from './hooks/useFetchData'

//styles
import "./App.css";
import "./styles/Modal.scss"
import "./styles/Login.css"

function App() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [modal, setModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState([]);
  const [petData, setPetData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [modalContent, setModalContent] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [userPets, setUserPets] = useState([]);
  const [error, setError] = useState(null);
  const [petPoints, setPetPoints] = useState(0);
  const [ranking, setRanking] = useState('Bronze');
  const [latestActivity, setLatestActivity] = useState('None yet!');
  const [showAddPetForm, setShowAddPetForm] = useState(false);
  
  const userId = user?.sub;
  
  const [achievements, setAchievements] = useState([
    { name: 'Take a Selfie', icon: '📸', description: 'Take a selfie with your pet', completed: false, points: 15 },
    { name: 'Have a Picnic', icon: '🍉', description: 'Enjoy a picnic with your pet in the park', completed: false, points: 25 },
    { name: 'Dress Up Your Pet', icon: '👗', description: 'Dress up your pet in a costume', completed: false, points: 15 },
    { name: 'Host a Pet Playdate', icon: '🐾', description: 'Arrange a playdate for your pet with another pet friend', completed: false, points: 30 },
    { name: 'Enter a Pet Costume Contest', icon: '🏆', description: 'Enter a pet costume contest or competition', completed: false, points: 40 },
    { name: 'Go on a Road Trip', icon: '🚗', description: 'Take your pet on a road trip adventure', completed: false, points: 50 },
    { name: 'Donate to a Pet Charity', icon: '💕', description: 'Donate to a pet charity or rescue organization', completed: false, points: 35 },
    { name: 'Take a Hike', icon: '⛰️', description: 'Go on a hike with your pet and explore nature', completed: false, points: 40 },
    { name: 'Visit a Pet-friendly Café', icon: '☕', description: 'Enjoy a cup of coffee at a pet-friendly café with your pet', completed: false, points: 25 },
    { name: 'Create a DIY Toy', icon: '🧸', description: 'Craft a homemade toy for your pet to play with', completed: false, points: 20 },
    { name: 'Explore a New Park', icon: '🌳', description: 'Discover a new park or trail with your pet', completed: false, points: 35 },
    { name: 'Try Agility Training', icon: '🏅', description: 'Participate in agility training with your pet', completed: false, points: 45 },
    { name: 'Have a Picnic', icon: '🧺', description: 'Enjoy a picnic in the park with your pet', completed: false, points: 30 },
    { name: 'Teach a New Trick', icon: '🎩', description: 'Teach your pet a new trick or command', completed: false, points: 35 },
    { name: 'Go Swimming', icon: '🏊‍♂️', description: 'Take your pet for a swim in a pet-friendly pool or beach', completed: false, points: 50 },
    { name: 'Attend a Pet-friendly Movie Night', icon: '🎬', description: 'Attend a pet-friendly movie screening with your pet', completed: false, points: 40 },
  ]);

  // // Auth0 Token
  // useEffect(() => {
  //   const fetchAccessToken = async () => {
  //     try {
  //       if (isAuthenticated) {
  //         const token = await getAccessTokenSilently();
  //         setAccessToken(token);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching access token:", error);
  //     }
  //   };

  //   fetchAccessToken();
  // }, [isAuthenticated, getAccessTokenSilently]);

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
    setUserPets([]);
    setModalContent([]);
  }, [user]);

  // fetch user's pet data for list
  useFetchData("http://localhost:8080/pets", "pets", setPetData, setFetchError);

  // logic for navbar user pet list
  function handlePetListSelect(event, petId) {
    // console.log('event: ', event);
    event.preventDefault();
    setSelectedPet(petId);
    // console.log('selected pet: ', petId);
      setModalContent(<PetProfile user={user} selectedPet={petId} />);
      // console.log('modal content: ', modalContent);
      openModal(event)
    }
  

  function handleAddNewPet(event) {
    event.preventDefault();
    addPoints(10);
    setModalContent(<AddPetForm onSubmit={handleAddPet} />);
    openModal(event);
  }
  
  async function handleAddPet(petName, petType) {
    try {
      const response = await axios.post('http://localhost:8080/pets', {
        name: petName,
        type: petType,
      });
  
      console.log(response.data);
      closeModal();
      // Update the pet data
      useFetchData("http://localhost:8080/pets", "pets", setPetData, setFetchError);
    } catch (error) {
      console.error('Error adding pet', error);
    }
  }

  const handleSetPetPoints = (pointsToAdd) => {
    setPetPoints(prevPoints => prevPoints + pointsToAdd);
  };

// create a function that can be added to any component to add points to petPoints and takes in point value as props
const addPoints = (points) => {
  setPetPoints(petPoints + points);
}

  // logic for opening user profile modal

  const openCurrentUserModal = (event) => {
    setSelectedPet(null);
    // console.log('pet data: ', petData);

    setPetData(petData);
    setModalContent(<UserProfile handlePetListSelect={handlePetListSelect} latestActivity={latestActivity} setLatestActivity={setLatestActivity} achievements={achievements} accessToken={accessToken} handleSetPetPoints={handleSetPetPoints} petPoints={petPoints} petData={petData} user={user} userId={userId} />);
    openModal(event);
  };

  const openModal = (event) => {
    event.preventDefault();
    addPoints(10);
    setModal(true);
  };

  const closeModal = (event) => {
    event.preventDefault();
    console.log('closing modal');
    setModalContent([]);
    setModal(false);
  };

  return (
    <AuthProvider accessToken={accessToken}>
      <div className="App">
      <div className={`${(!user && !isLoading) ? 'login-page-container' : ''}`}>
  {isLoading ? (
    <Loading />
  ) : (
    <>
      {!user && <LoginButton className="login-button-login-page" />}
      {error && <p>Authentication Error</p>}
      {!error && user && (
        <HomeRoute setLatestActivity={setLatestActivity} showAddPetForm={showAddPetForm} setShowAddPetForm={setShowAddPetForm} handleAddNewPet={handleAddNewPet} achievements={achievements} handleSetPetPoints={handleSetPetPoints} ranking={{ranking, setRanking}} latestActivity={{latestActivity, setLatestActivity}} setAchievements={setAchievements} petPoints={petPoints} user={user} userId={userId} setPetData={setPetData} openCurrentUserModal={openCurrentUserModal} petData={petData} handlePetListSelect={handlePetListSelect} />
      )}
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