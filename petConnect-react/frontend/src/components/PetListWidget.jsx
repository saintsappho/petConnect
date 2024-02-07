import useFetchData from "../hooks/useFetchData";

// Widget used for populating lists of pets based on payload
export default function PetListWidget({petData, listPayload}) {

   function renderCurrentUserPets() {
    console.log('current user pets called', petData);

    // 'current-user' payload will render the pet list with the user's pets
    return petData.map((pet) => {
      return (
        <tr key={pet.id} id="pet-list-item">
          <td><img id="pet-photo" src={pet.profile_photo_url}/></td>
          <td>{pet.pet_name}</td>
          <td>{pet.breed}</td>
        </tr>
      );
    });
  }

  // 'all-pets' payload will render the pet list with all pets  -- NOT WORKING, NEEDS TO BE IMPLEMENTED -- 
  const renderAllPets = () => {
    return petData.map((pet) => {
      return (
        <div key={pet.id} id="pet-list-item">
          <img id="pet-photo" src={pet.profile_photo_url}/>          
        <tr>
          <td><h2>{pet.owner_name}</h2></td>
          <td><h2>{pet.pet_name}</h2></td>
        </tr>
        </div>
      );
    });
  };

  // Conditional rendering based on payload
return (listPayload === "currentUser") ? renderCurrentUserPets() : renderAllPets();

}