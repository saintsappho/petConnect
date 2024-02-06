/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
// import useFetchData from "../../hooks/useFetchData";
//components
import Event from "./postcards/_Event.jsx";
import Forum from "./postcards/_Forum.jsx";
import Photo from "./postcards/_Photo.jsx";
import Poll from "./postcards/_Poll.jsx";
import Text from "./postcards/_Text.jsx";

export default function PetPost(props) {
  const { petPost } = props;
  const [imageSrc, setImageSrc] = useState(null);
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(null);

  const randomImage = () => {
    return `https://source.unsplash.com/random/300x510?${
      petPost.title || "pet"
    }`;
  };

  return (
    <>
      {petPost.style === "text-post" && (
        <Text petPost={petPost} randomImage={randomImage} />
      )}
      {petPost.style === "photo-post" && (
        <Photo petPost={petPost} randomImage={randomImage} />
      )}
      {petPost.style === "poll-post" && (
        <Poll petPost={petPost} randomImage={randomImage} />
      )}
      {petPost.style === "forum-post" && (
        <Forum petPost={petPost} randomImage={randomImage} />
      )}
      {petPost.style === "event-post" && (
        <Event petPost={petPost} randomImage={randomImage} />
      )}
    </>
  );
}
