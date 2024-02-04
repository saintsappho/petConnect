import React from 'react';
import PetProfile from './PetProfile';
import "../styles/PetProfileModal.css"

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

const PetProfileModal = ({ closeModal }) => {
  return (
    <div className="profile-modal">
      <button className="profile-modal__close-button" onClick={closeModal}></button>
      <PetProfile pet={petData} selectedPet={selectedPet} />
    </div>
  );
};

export default PetProfileModal;