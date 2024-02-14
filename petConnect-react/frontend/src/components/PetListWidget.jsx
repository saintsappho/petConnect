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
  showAddPetForm,
  setShowAddPetForm,
  handleHide,
}) {
  const [selectedPet, setSelectedPet] = useState(false, null);
  const [refreshPets, setRefreshPets] = useState(false);
  const [filteredPets, setFilteredPets] = useState([]);

  function handlePetSelect(pet) {
    setSelectedPet(selectedPet === pet ? null : pet);
  }

  function handleNewPet() {
    setTimeout(() => {
      setRefreshPets(!refreshPets);
      setShowAddPetForm(false);
    }, 1000);
  }
  if (isNaN(userId)) {
    userId = 1;
  }
  // this is to render user's pets
  useEffect(() => {
    fetch(`http://localhost:8080/pets/${userId}`)
      .then((response) => response.json())
      .then((data) => {
      // console.log(data, 'data')
        setFilteredPets(data);
      });
  }, [refreshPets]);


  function renderCurrentUserPets() {
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
                  src={pet.image_file}
                />
              </div>
              <div id="pet-info-short">
                <p>{pet.pet_name}</p>
              </div>
            </div>
          );
        })}
        {divClass === "poster-pet-widget" ? <></> : (<div className={`${divClass} add-new-pet`}>
          <p className="add-new-pet-button" onClick={() => {setShowAddPetForm(true), handleHide()}}> + Add Pet</p>
        </div>)}
        {showAddPetForm && (
          <div className="new-pet-modal">
            <div className="new-pet-modal-content">
              <span
                className="new-pet-modal-close"
                onClick={() => {handleHide(), setShowAddPetForm(false)}}
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
          <img id="pet-photo" src={pet.image_file} />
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
