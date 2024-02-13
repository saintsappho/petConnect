/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect, useRef, useState } from "react";

export default function UploadWidget(props) {
  const { handlePostStateChange, imgResult, setImgResult, postState } = props;
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  
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

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dp3almven",
        uploadPreset: "b3oyqmyf",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          // console.log("Done! Here is the image info: ", result.info);
          setImgResult(result.info.url);
          handlePostStateChange(result.info.url, "image_file");
          // console.log("result.info.url: ", result.info.url);
          // console.log("added following to postState: ", postState.image_file);
        }
      },
    );
  }, []);

  return (
    <>
      {imgResult ? <img className="photo-post-preview" src={imgResult} alt="uploaded image" /> : <button
        onClick={() => {
          widgetRef.current.open();
        }}
        className="submit bubbly-button"
      >
        Upload Image
      </button>}
    </>
  );
}
