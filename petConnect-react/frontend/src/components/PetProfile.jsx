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
        <div className="petHeadShape">
        <img className="pet-profile-pic" src={profile_photo_url} alt="Pet Profile Picture" />
        </div>
        <h1>{pet_name}</h1>
        <div className="profile__buttons"> 
          <button className="profile__follow-button" onClick={()=>{console.log("followed pet")}}>Follow</button>
        </div>
        <p>{location}</p>
        {/* In profile creation, ask species and favorite activity to fill this in */}        
        <label>I&apos;m a {age} year old {breed} that loves {routines.split(' ')[0]}! </label>
      </div>
    <MeetOwnerButton user={user} />

      <table className="pet-info-table">
        <tbody>
          <tr>
            <td>Species:</td>
            <td>{species}</td>
          </tr>
          <tr>
            <td>Age:</td>
            <td>{age}</td>
          </tr>
          <tr>
            <td>Sex:</td>
            <td>{sex}</td>
          </tr>
          <tr>
            <td>Breed:</td>
            <td>{breed}</td>
          </tr>
          <tr>
            <td>Color:</td>
            <td>{color}</td>
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
