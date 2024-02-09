import useFetchData from "../hooks/useFetchData";

// Widget used for populating lists of pets based on payload
export default function PetListWidget({ petData, listPayload }) {

  function renderCurrentUserPets() {
    console.log('current user pets called', petData);

    // Hard-coded user id for now
    const userId = 1;
    // Find the pet that matches the user id
      const pet = petData.find(pet => pet.pet_id === Number(userId));
      
    return petData.map((pet) => {
      return (
        <div key={pet.id} id="pet-list-item">
          <div><img id="pet-photo" src={pet.profile_photo_url} /></div>
          <div id="pet-info-short">
            <th>{pet.pet_name}</th>
            <tr>{pet.breed}</tr>
          </div>
        </div>
      );
    });

  }

  // 'all-pets' payload will render the pet list with all pets  -- NOT WORKING, NEEDS TO BE IMPLEMENTED -- 
  const renderAllPets = () => {
    return petData.map((pet) => {
      return (
        <div key={pet.id} id="pet-list-item">
          <img id="pet-photo" src={pet.profile_photo_url} />
          <td>
            <td><h2>{pet.owner_name}</h2></td>
            <td><h2>{pet.pet_name}</h2></td>
          </td>
        </div>
      );
    });
  };

  // Conditional rendering based on payload
  return (listPayload === "currentUser") ? renderCurrentUserPets() : renderAllPets();

}