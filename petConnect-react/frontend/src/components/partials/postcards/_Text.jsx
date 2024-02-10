/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import useFormatDateTime from "../../../assets/helpers/formatDateTime";
import React, { useState } from "react";
import NewComment from "./_NewComment";

export default function Text(props) {
  const { randomImage, petPost, comments } = props;
  const [form, setForm] = useState(false);

  return (
    <div className="card">
      <div id="img-container"></div>
      <figure className="card__thumb">
        <img
          src={randomImage()}
          alt="Random image from unsplash"
          className="card__image"
        ></img>
        <figcaption className="card__caption">
          <h2 className="card__title">{petPost.title}</h2>
          <p className="card__snippet">{petPost.content}</p>
          {!form ? <a onClick={()=> setForm(!form)} className="card__button">
            Comment?
          </a> : <NewComment petPost={petPost}/>}
          {comments}
        <p>{useFormatDateTime(petPost.registration_date)}</p>
        </figcaption>
      </figure>
    </div>
  );
}
