

// Pet Profile Component

export default function PetProfile() {
  return (
    <div className="pet-profile-container">
      <img className="pet-profile-pic" src="./src/assets/puppy.jpg" alt="Pet Profile Picture" />
    
      <div className="pet-profile-header">
        <h1>Maxwell</h1>
        <p>Los Angles, California</p>
        {/* In profile creation, ask species and favorite activity to fill this in */}        
        <label>I&apos;m a 2 year old Golden Retriever that loves to play fetch! </label>
      </div>

      <div className="pet-profile-item">
        <label>Breed:</label>
        <span id="breed"></span>
      </div>

      <div className="pet-profile-item">
        <label>Medical Conditions:</label>
        <span id="medical-conditions"></span>
      </div>

      <div className="pet-profile-item">
        <label>Diet:</label>
        <span id="diet"></span>
      </div>

      <div className="pet-profile-item">
        <label>Allergies:</label>
        <span id="allergies"></span>
      </div>

      <div className="pet-profile-item">
        <label>Routines:</label>
        <span id="routines"></span>
      </div>

      <div className="pet-profile-item">
        <label>Registration Date:</label>
        <span id="registration-date"></span>
      </div>
    </div>
  );
};
