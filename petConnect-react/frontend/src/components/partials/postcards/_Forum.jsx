/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import useFormatDateTime from "../../../assets/helpers/formatDateTime";
import React, { useState } from "react";
import NewComment from "./_NewComment";

export default function Forum(props) {
  const { randomImage, petPost, comments, handleComment, user, handleShowComments, show } = props;
  const [form, setForm] = useState(false);
 
  return (
    <div className="forum">
      <figure className="forum__thumb">
        <img
          src={petPost.image_file || randomImage()}
          alt={petPost.content}
          className="forum__image"
        ></img>
        <figcaption className="forum__caption">
          <h2 className="forum__title">{petPost.title}</h2>
          <div className="user-details">
            <h4 className="forum__author">{user.username}</h4>
          </div>
          <p className="forum__snippet">{petPost.content}</p>
          {!form ? <a onClick={()=> setForm(!form)} className="forum__button">
            Be Heard!
          </a> : <NewComment handleComment={handleComment} petPost={petPost} />}
          <a  className="show-comments-button">
            Comments ({comments.length})
          </a>
          <div className="comments-section">
            {comments}
          </div>
          <p>{useFormatDateTime(petPost.registration_date)}</p>
        </figcaption>
      </figure>
    </div>
  );
}
