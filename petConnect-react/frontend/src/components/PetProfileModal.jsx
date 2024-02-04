import React from 'react';
import PetProfile from './PetProfile';
import "../styles/PetProfileModal.css"


const PetProfileModal = ({ closeModal, petData, selectedPetData }) => {
  return (
    <div className="profile-modal">
      <button className="profile-modal__close-button" placeholder="X" onClick={closeModal}></button>
      <PetProfile selectedPetData={selectedPetData} />
    </div>
  );
};

export default PetProfileModal;