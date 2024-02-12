/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import UploadWidget from "./_UploadWidget";

export default function PhotoPost(props) {
  const { handleSubmit, handlePostStateChange, postState, handleUpload } = props;

  const { image_file, content } = postState;

  
  
  return (
    <form onSubmit={()=>{handleSubmit()}}>
      <div className="form-row">
        <div className="input-data photo">
          <input type="file" id="new-image" accept="image/*" onChange={(event) => {handlePostStateChange(event, "image_file")}} required/>
          {/* <UploadWidget handlePostStateChange={handlePostStateChange} handleUpload={handleUpload}/> */}
        </div>
      </div>
      
      <div className="form-row">
        <div className="input-data textarea">
          <textarea
            id="new-content"
            value={content}
            onChange={(event) => {
              handlePostStateChange(event, "content");
            }}
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
