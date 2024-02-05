import "../styles/PetProfile.css";

// Pet Profile Component

export default function PetProfile({ selectedPet }) {
  if (!selectedPet) {
    return null;
  }

  const { pet_name, age, breed, location, routines, medical_conditions, diet, allergies, registration_date } = selectedPet;
  return (
    <div className="pet-profile-container">
      <img className="pet-profile-pic" src="./src/assets/Image(1).jpeg" alt="Pet Profile Picture" />
    
      <div className="pet-profile-header">
        <h1>{pet_name}</h1>
        <p>{location}</p>
        {/* In profile creation, ask species and favorite activity to fill this in */}        
        <label>I&apos;m a {age} year old {breed} that loves {routines}! </label>
      </div>

      <div className="pet-profile-item">
        <label>Breed: {breed}</label>
        <span id="breed"></span>
      </div>

      <div className="pet-profile-item">
        <label>Medical Conditions: {medical_conditions}</label>
        <span id="medical-conditions"></span>
      </div>

      <div className="pet-profile-item">
        <label>Diet: {diet}</label>
        <span id="diet"></span>
      </div>

      <div className="pet-profile-item">
        <label>Allergies: {allergies}</label>
        <span id="allergies"></span>
      </div>

      <div className="pet-profile-item">
        <label>Routines: {routines}</label>
        <span id="routines"></span>
      </div>

      <div className="pet-profile-item">
        <label>Registration Date: {registration_date}</label>
        <span id="registration-date"></span>
      </div>
    </div>
  );
};
