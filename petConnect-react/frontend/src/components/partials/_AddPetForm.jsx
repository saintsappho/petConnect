import React, { useState } from "react";
import axios from "axios";
import UploadWidget from "./newpost/_UploadWidget";

// This component will be used to add a new pet to the database
export default function AddPetForm(props) {
  const { handleNewPet } = props;
  const [file, setFile] = useState(null); //
  const [imgResult, setImgResult] = useState(null); //
  const [petData, setPetData] = useState({
    pet_name: "",
    species: "",
    age: "",
    breed: "",
    color: "",
    sex: "",
    medical_conditions: "",
    diet: "",
    allergies: "",
    routines: "",
    user_id: 1,
    image_file: "",
  });
  const handleInput = (event, key) => {
    if (key === "image_file") {
      setPetData({
        ...petData,
        [key]: event,
      });
    } else {
      setPetData({
        ...petData,
        [key]: event.target.value, // Use e.target.value for text inputs
      });
    }
  };

  const handleUpload = (file) => {
    setFile(file);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/pets", petData);
      console.log(response.data);
    } catch (error) {
      console.error("Error adding pet", error);
    }
  };

  return (
    <form className="add-pet-form" onSubmit={handleSubmit}>
      <div>
        <label>
          Pet Name:
          <input
            onKeyUp={() => {
              handleInput(event, "pet_name");
            }}
            type="text"
            name="pet_name"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Species:
          <input
            onKeyUp={() => {
              handleInput(event, "species");
            }}
            type="text"
            name="species"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Age:
          <input
            onKeyUp={() => {
              handleInput(event, "age");
            }}
            type="number"
            name="age"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Breed:
          <input
            onKeyUp={() => {
              handleInput(event, "breed");
            }}
            type="text"
            name="breed"
            required
          />
        </label>
      </div>
      <div>
        <label>
          color:
          <input
            onKeyUp={() => {
              handleInput(event, "color");
            }}
            type="text"
            name="color"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Sex:
          <input
            onKeyUp={() => {
              handleInput(event, "sex");
            }}
            type="text"
            name="sex"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Medical Conditions:
          <input
            onKeyUp={() => {
              handleInput(event, "medical_conditions");
            }}
            type="text"
            name="medical_conditions"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Diet:
          <input
            onKeyUp={() => {
              handleInput(event, "diet");
            }}
            type="text"
            name="diet"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Allergies:
          <input
            onKeyUp={() => {
              handleInput(event, "allergies");
            }}
            type="text"
            name="allergies"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Routines:
          <input
            onKeyUp={() => {
              handleInput(event, "routines");
            }}
            type="text"
            name="routines"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Profile Photo:
          {petData.image_file ? (
            <img className="photo-post-preview" src={petData.image_file}></img>
          ) : (
            <UploadWidget
              postState={petData}
              setImgResult={setImgResult}
              handlePostStateChange={handleInput}
              handleUpload={handleUpload}
            />
          )}
        </label>
      </div>
      <button onClick={handleNewPet} type="submit">
        Add Pet
      </button>
    </form>
  );
}
