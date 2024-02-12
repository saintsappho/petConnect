import React from 'react';
import axios from 'axios';
import UploadWidget from './newpost/_UploadWidget';

// This component will be used to add a new pet to the database
export default function AddPetForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const petData = {
      pet_name: formData.get('pet_name'),
      species: formData.get('species'),
      age: formData.get('age'),
      breed: formData.get('breed'),
      color: formData.get('color'),
      sex: formData.get('sex'),
      medical_conditions: formData.get('medical_conditions'),
      diet: formData.get('diet'),
      allergies: formData.get('allergies'),
      routines: formData.get('routines'),
      profile_photo_url: formData.get('profile_photo_url'),
    };

    try {
      const response = await axios.post('http://localhost:8080/pets', petData);
      console.log(response.data);
    } catch (error) {
      console.error('Error adding pet', error);
    }
  };

  return (
    <form className="add-pet-form" onSubmit={handleSubmit}>
      <div>
        <label>
          Pet Name:
          <input type="text" name="pet_name" required />
        </label>
      </div>
      <div>
        <label>
          Species:
          <input type="text" name="species" required />
        </label>
      </div>
      <div>
        <label>
          Age:
          <input type="number" name="age" required />
        </label>
      </div>
      <div>
        <label>
          Breed:
          <input type="text" name="breed" required />
        </label>
      </div>
      <div>
        <label>
          Color:
          <input type="text" name="color" required />
        </label>
      </div>
      <div>
        <label>
          Sex:
          <input type="text" name="sex" required />
        </label>
      </div>
      <div>
        <label>
          Medical Conditions:
          <input type="text" name="medical_conditions" required />
        </label>
      </div>
      <div>
        <label>
          Diet:
          <input type="text" name="diet" required />
        </label>
      </div>
      <div>
        <label>
          Allergies:
          <input type="text" name="allergies" required />
        </label>
      </div>
      <div>
        <label>
          Routines:
          <input type="text" name="routines" required />
        </label>
      </div>
      <div>
        <label>
          Profile Photo URL:
          <input type="text" name="profile_photo_url" required />
          <UploadWidget />
        </label>
      </div>
      <button type="submit">Add Pet</button>
    </form>
  );
}
