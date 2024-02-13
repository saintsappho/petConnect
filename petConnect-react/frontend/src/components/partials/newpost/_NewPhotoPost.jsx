/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import UploadWidget from "./_UploadWidget";

export default function PhotoPost(props) {
  const { handleSubmit, handlePostStateChange, postState } = props;
  const { content } = postState;
  const [imgResult, setImgResult] = useState(null);

  var animateButton = function (e) {
    e.preventDefault;
    e.target.classList.remove('animate');
    e.target.classList.add('animate');
    setTimeout(function () {
      e.target.classList.remove('animate');
    }, 700);
  };
  var bubblyButtons = document.getElementsByClassName("bubbly-button");
  for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="input-data photo">
          {/* <input type="file" id="new-image" value={image_file} accept="image/*" onChange={(event) => {handlePostStateChange(event, "image_file")}} required/> */}
          <UploadWidget postState={postState} imgResult={imgResult} setImgResult={setImgResult} handlePostStateChange={handlePostStateChange} />
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
