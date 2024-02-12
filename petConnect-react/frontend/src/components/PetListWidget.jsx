import useFetchData from "../hooks/useFetchData";
import AddPetForm from "./partials/_AddPetForm";
import { useEffect, useState } from "react";

// Widget used for populating lists of pets based on payload
export default function PetListWidget({
  user,
  petData,
  listPayload,
  userId,
  divClass,
}) {
  const [selectedPet, setSelectedPet] = useState(false, null);
  const [refreshPets, setRefreshPets] = useState(false);
  const [filteredPets, setFilteredPets] = useState([]);

  function handlePetSelect(pet) {
    setSelectedPet(selectedPet === pet ? null : pet);
  }

  function handleNewPet() {
    setTimeout(() => {
      setRefreshPets(!refreshPets)}, 1000);
  }
  
  // this is to render user's pets
  useEffect(() => {
    if (userId.includes(userId)) {
      userId = 1;
    }
    setFilteredPets(petData.filter(
      (pet) => pet.user_id === Number(userId),
    ));
  }, [refreshPets]);

  function renderCurrentUserPets() {
    const [showAddPetForm, setShowAddPetForm] = useState(false);
    // ...
    return (
      <>
        {filteredPets.map((pet, index) => {
          return (
            <div key={index} className={divClass}>
              <div>
                <img
                  onClick={handlePetSelect}
                  className={selectedPet === (true, pet.name) ? "selected" : ""}
                  id="pet-photo"
                  src={pet.profile_photo_url}
                />
              </div>
              <div id="pet-info-short">
                <p>{pet.pet_name}</p>
              </div>
            </div>
          );
        })}
        <div className={`${divClass} add-new-pet`}>
          <p onClick={() => setShowAddPetForm(true)}> + Add Pet</p>
        </div>
        {showAddPetForm && (
          <div className="new-pet-modal">
            <div className="new-pet-modal-content">
              <span
                className="new-pet-modal-close"
                onClick={() => setShowAddPetForm(false)}
              >
                &times;
              </span>
              <AddPetForm handleNewPet={handleNewPet} />
            </div>
          </div>
        )}
      </>
    );
  }
  // 'all-pets' payload will render the pet list with all pets  -- NOT WORKING, NEEDS TO BE IMPLEMENTED --
  const renderAllPets = () => {
    return petData.map((pet) => {
      return (
        <div key={pet.id} id="pet-list-item">
          <img id="pet-photo" src={pet.profile_photo_url} />
          <td>
            <td>
              <h2>{pet.owner_name}</h2>
            </td>
            <td>
              <h2>{pet.pet_name}</h2>
            </td>
          </td>
        </div>
      );
    });
  };

  // Conditional rendering based on payload
  return listPayload === "currentUser"
    ? renderCurrentUserPets()
    : renderAllPets();
}
