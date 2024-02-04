import React from 'react';
import PetProfile from './PetProfile';

const selectedPet = {
  pet_name: "Max",
  species: "Dog",
  breed: "Golden Retriever",
  location: "San Francisco, CA"
};

const petData = {
  pet_name: "Max",
  species: "Dog",
  breed: "Golden Retriever",
  location: "San Francisco, CA",
  age: 2,
  medical_conditions: "None",
  diet: "Kibble",
  allergies: "None",
  routines: "Walks, Fetch",
  registration_date: "08/01/2021"
};

const ProfileModal = ({ hideModal }) => {
  return (
    <div className="profile-modal">
      <h2 className="profile-modal__title">Pet Profile</h2>
      <PetProfile pet={petData} selectedPet={selectedPet} />
      <button className="profile-modal__close-button" onClick={hideModal}></button>
    </div>
  );
};

export default ProfileModal;