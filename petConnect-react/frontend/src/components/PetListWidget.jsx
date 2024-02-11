import useFetchData from "../hooks/useFetchData";

// Widget used for populating lists of pets based on payload
export default function PetListWidget({ petData, listPayload, userId, divClass}) {


  function renderCurrentUserPets() {

    // this is to render Dylan's pets
    console.log(userId);
    if (userId.includes("auth0|65c937b9e1ecca451f9fe1e5")) {
      userId = 10;
    }
    const filteredPets = petData.filter(pet => pet.user_id === Number(userId));
  
    return filteredPets.map((pet) => {
      return (
        <div key={pet.id} className={divClass}>
          <div><img id="pet-photo" src={pet.profile_photo_url} /></div>
          <div id="pet-info-short">
            <p>{pet.pet_name}</p>
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
