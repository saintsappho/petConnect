import "../styles/PetProfile.css";
import MeetOwnerButton from "./partials/_MeetOwnerButton";


// Pet Profile Component

export default function PetProfile({ selectedPet, user }) {
  if (!selectedPet) {
    return null;
  }
  const { location } = user;
  const { pet_name, species, age, breed, color, sex, medical_conditions, diet, allergies, routines, registration_date, profile_photo_url } = selectedPet;
  return (
    <div className="pet-profile-container">
      <div className="pet-profile-header">
        <img className="pet-profile-image" src={profile_photo_url} alt="Pet Profile Picture" />
        <h1 className="pet-profile-name">{pet_name}</h1>
        <h2>{location}</h2>
        <div className="pet-profile-buttons">
          <button className="pet-profile-follow-button" onClick={() => { console.log("followed pet") }}>Follow</button>
        </div>
        <div className="pet-profile-bio">
          <label>I&apos;m a {age} year old {breed} that loves {routines}</label>
        </div>        
      </div>

      <div className="pet-profile-meet-owner">
        <MeetOwnerButton user={user}/>
      </div>

      <div className="pet-profile-body">
        <tbody>

          <tr>
            <td>Species:</td>
            <td>{species}</td>
          </tr>

          <tr>
            <td>Breed:</td>
            <td>{breed}</td>
          </tr>

          <tr>
            <td>Sex:</td>
            <td>{sex}</td>
          </tr>

          <tr>
            <td>Age:</td>
            <td>{age}</td>
          </tr>

          <tr>
            <td>Color:</td>
            <td>{color}</td>
          </tr>

          <tr>
            <td>Diet:</td>
            <td>{diet}</td>
          </tr>
          
          <tr>
            <td>Medical Conditions:</td>
            <td>{medical_conditions}</td>
          </tr>

          <tr>
            <td>Allergies:</td>
            <td>{allergies}</td>
          </tr>

          <tr>
            <td>Routines:</td>
            <td>{routines}</td>
          </tr>
          
        </tbody>
      </div>
    </div>
  );
}