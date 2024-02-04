// import React, { useCallback, useState } from "react";

export default function PetPost(props) {
  const { petPost } = props;
  console.log('PetPost:', petPost);
  if (!petPost) {
    return (<>
      <h1>No posts to show </h1>
      <p>[emptyboxgif]</p>
    </>
    ); // or render a loading message or handle the case when petPost is undefined
  }
  if (petPost.style === "text") {
    return (
      <div className="post text">
        <h1>{petPost.title}</h1>
        <h2>{petPost.pet_ID}</h2>
        <h3>{petPost.content}</h3>
      </div>
    );
  }
  if (petPost.style === "photo") {
    return (
      <div className="post photo">
        <h2>{petPost.pet_ID}</h2>
        <img src={petPost.imageURL} alt={petPost.title} />
        <h3>{petPost.content}</h3>
      </div>
    );
  }
  if (petPost.style === "poll") {
    return (
      <div className="post poll">
        <h1>{petPost.title}</h1>
        <h2>{petPost.pet_ID}</h2>
        <h3>{petPost.content}</h3>
      </div>
    );
  }
  if (petPost.style === "event") {
    return (
      <div className="post event">
        <h1>{petPost.title}</h1>
        <h2>{petPost.pet_ID}</h2>
        <h3>{petPost.content}</h3>
      </div>
    );
  }
  if (petPost.style === "forum") {
    return (
      <div className="post forum">
        <h1>{petPost.title}</h1>
        <h2>{petPost.pet_ID}</h2>
        <h3>{petPost.content}</h3>
      </div>
    );
  }
}
