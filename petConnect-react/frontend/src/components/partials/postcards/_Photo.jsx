/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import useFormatDateTime from "../../../assets/helpers/formatDateTime";
import NewComment from "./_NewComment";

export default function Photo(props) {
  const { petPost, comments, handleComment, user } = props;
  const [form, setForm] = useState(false);
  const [displayComments, setDisplayComments] = useState(false);

  return (
    <div className="card">
      <figure className="card__thumb">
        <img
          src={petPost.image_file}
          alt={petPost.content}
          className="card__image"
        ></img>
        <figcaption className="card__caption">
          <div className="user-details">
            <h4 className="card__author">{user.username}</h4>
          </div>
          <p className="card__snippet">{petPost.content}</p>
          {!form ? (
            <a onClick={() => setForm(!form)} className="card__button">
              Thoughts?
            </a>
          ) : (
            <NewComment
              handleComment={handleComment}
              post_ID={petPost.post_id}
            />
          )}
          <a
            onClick={() => setDisplayComments(!displayComments)}
            className="show-comments-button"
          >
            Comments ({comments.length})
          </a>
          {displayComments && comments}
          <p>{useFormatDateTime(petPost.registration_date)}</p>
        </figcaption>
      </figure>
    </div>
  );
}
