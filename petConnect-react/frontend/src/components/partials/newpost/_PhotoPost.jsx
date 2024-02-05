/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";

export default function PhotoPost(props) {
  const {
    handleSubmit,
    handlePostStateChange,
    postState
  } = props;
  
  const { image_file, content } = postState;

  const [file, setFile] = useState();
  function handleChange(e) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Set the image_file state with the data URL
        handlePostStateChange(reader.result, "image_file"); //reader.result
      }
      reader.readAsDataURL(file);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="input-data textarea">
          <label htmlFor="file">Upload your Photo:</label>
          <input
            className="input-data"
            type="file"
            id="file"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="input-data textarea">
          <textarea
            id="new-content"
            value={content}
            onChange={(event)=>{handlePostStateChange(event, "content")}}
            rows="8"
            cols="80"
            required
          ></textarea>
          <br />
          <div className="underline"></div>
          <label htmlFor="">Caption</label>
        </div>
      </div>
      <button className="submit bubbly-button" type="submit">
        Post!
      </button>
    </form>
  );
}
