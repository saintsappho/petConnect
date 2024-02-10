/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import useFormatDateTime from "../../../assets/helpers/formatDateTime";
import React, { useState } from "react";
import NewComment from "./_NewComment";

export default function Forum(props) {
  const { randomImage, petPost, comments, handleComment } = props;
  const [form, setForm] = useState(false);
  const [displayComments, setDisplayComments] = useState(false);
  return (
    <div className="card">
      <figure className="card__thumb">
        <img
          src={petPost.image_file || randomImage()}
          alt={petPost.content}
          className="card__image"
        ></img>
        <figcaption className="card__caption">
          <h2 className="card__title">{petPost.title}</h2>
          <p className="card__snippet">{petPost.content}</p>
          {!form ? <a onClick={()=> setForm(!form)} className="card__button">
            Be Heard!
          </a> : <NewComment handleComment={handleComment} post_ID={petPost.post_id} />}
          <a onClick={()=> setDisplayComments(!displayComments)} className="show-comments-button">
            Comments ({comments.length})
          </a>
          {displayComments && comments}
          <p>{useFormatDateTime(petPost.registration_date)}</p>
        </figcaption>
      </figure>
    </div>
  );
}
