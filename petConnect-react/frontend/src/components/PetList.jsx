import React from "react";
import Pet from "./PetListItem";


const PetList = ({ pets, dark, showModal }) => {
  // Check if pets is an object or an array
  if (typeof(pets) === 'object') {
    pets = Object.values(pets);
  }

  // Create a template for each pet
  const petList = pets.map(pet => {
    return (
      <Pet
        key={pet.pet_ID}
        user_ID={pet.user_ID}
        pet={pet.pet_name}
        breed={pet.breed}
        showModal={() => showModal(pet)}
      />
    );
  });

 // Return the template wrapped in a ul
  return (
    <ul className="pet-list">
      {petList}
    </ul>
  );
};

export default PetList;