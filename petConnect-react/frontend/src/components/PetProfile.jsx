import "../styles/PetProfile.css";


// Pet Profile Component

export default function PetProfile({ selectedPet, user }) {
  if (!selectedPet) {
    return null;
  }

  const { pet_name, age, breed, location, routines, medical_conditions, diet, allergies, registration_date } = selectedPet;
  return (
    <div className="pet-profile-container">
      <div className="pet-profile-header"> 
        <img className="pet-profile-pic" src={"./src/assets/Image(1).jpeg"} alt="Pet Profile Picture" />
        <h1>{pet_name}</h1>
        <div className="profile__buttons"> 
          <button className="profile__follow-button" onClick={()=>{console.log("followed pet")}}>Follow</button>
        </div>
        <p>{location}</p>
        {/* In profile creation, ask species and favorite activity to fill this in */}        
        <label>I&apos;m a {age} year old {breed} that loves {routines}! </label>
      </div>


      <table className="pet-info-table">
        <tbody>
          <tr>
            <td>Breed:</td>
            <td>{breed}</td>
          </tr>
          <tr>
            <td>Medical Conditions:</td>
            <td>{medical_conditions}</td>
          </tr>
          <tr>
            <td>Diet:</td>
            <td>{diet}</td>
          </tr>
          <tr>
            <td>Allergies:</td>
            <td>{allergies}</td>
          </tr>
          <tr>
            <td>Routines:</td>
            <td>{routines}</td>
          </tr>
          <tr>
            <td>Registration Date:</td>
            <td>{registration_date}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
