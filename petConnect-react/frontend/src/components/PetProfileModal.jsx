import React from 'react';
import PetProfile from './PetProfile';
import "../styles/PetProfileModal.css"


const PetProfileModal = ({ closeModal }) => {
  return (
    <div className="profile-modal">
      <button className="profile-modal__close-button" placeholder="X" onClick={closeModal}></button>
      <PetProfile petData ={petData} selectedPetData={petData} />
    </div>
  );
};

export default PetProfileModal;