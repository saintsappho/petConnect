/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import useFormatDateTime from "../../../assets/helpers/formatDateTime";
import React, { useState } from "react";
import NewComment from "./_NewComment";
import DeleteButton from "../buttons/_DeleteButton.jsx";

export default function Forum(props) {
  const {
    randomImage,
    petPost,
    comments,
    handleComment,
    handleDelete,
    user,
    handleShowComments,
    show,
  } = props;
  const [form, setForm] = useState(false);
  const [adminSettings, setAdminSettings] = useState(false);

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
          <div className="card__buttons">
            <div className="user-details">
              <h4 className="forum__author">{user.username}</h4>
            </div>
            <div className="post-options">
              <div className="post-options-buttons">
                {user.username === "Robin Fleur" && (
                  <button
                    onClick={() => setAdminSettings(!adminSettings)}
                    className="post-burger bubbly-button"
                  >
                    &#8801;
                  </button>
                )}
                {adminSettings && (
                  <>
                    <button className="edit-button bubbly-button">Edit</button>
                    <DeleteButton
                      handleDelete={handleDelete}
                      postId={petPost.post_id}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          <p className="forum__snippet">{petPost.content}</p>
          {!form ? (
            <a onClick={() => setForm(!form)} className="forum__button">
              Be Heard!
            </a>
          ) : (
            <NewComment handleComment={handleComment} petPost={petPost} />
          )}
          <a className="show-comments-button">Comments ({comments.length})</a>
          <div className="comments-section">{comments}</div>
          <p>{useFormatDateTime(petPost.registration_date)}</p>
        </figcaption>
      </figure>
    </div>
  );
}
