import React from "react";


const petListItem = ({ pet, petId, showModal }) => {

  // Return the template for each pet
  return (
    <div className={`pet-list__item`}>
      <img className="pet-list__image" src="frontend/src/assets/puppy.jpg" alt={`Image taken in ${location.city}, ${location.country}`} onClick={showModal}></img>
      <div className="pet-list__pet-details">
        <div className="pet-list__pet-info">
          <span>Max</span>
          <div className="pet-list__species-breed">
            <span>Golden Retriever</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default petListItem;