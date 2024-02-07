import useFetchData from "../hooks/useFetchData";

// Widget used for populating lists of pets based on payload
export default function PetListWidget({petData, listPayload}) {

   function renderCurrentUserPets() {
    console.log('current user pets called', petData);

    // 'current-user' payload will render the pet list with the user's pets
    return petData.map((pet) => {
      return (
        <tr key={pet.id} id="pet-list-item">
          <td>{pet.photo}</td>
          <td>{pet.name}</td>
          <td>{pet.breed}</td>
        </tr>
      );
    });
  }

  // 'all-pets' payload will render the pet list with all pets
  const renderAllPets = () => {
    return petData.map((pet) => {
      return (
        <div key={pet.id} id="pet-list-item">
        <tr>
          <td>{pet.photo}</td>
          <td>{pet.name}</td>
          <td>{pet.breed}</td>
        </tr>
        </div>
      );
    });
  };

  // Conditional rendering based on payload
(listPayload === "currentUser") ? renderCurrentUserPets() : renderAllPets();
return;

  }
