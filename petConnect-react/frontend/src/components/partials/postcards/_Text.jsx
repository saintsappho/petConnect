/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import useFormatDateTime from "../../../assets/helpers/formatDateTime";
import React, { useState } from "react";
import NewComment from "./_NewComment";
import DeleteButton from "../buttons/_DeleteButton.jsx";

export default function Text(props) {
  const {
    randomImage,
    petPost,
    comments,
    handleComment,
    form,
    handleForm,
    user,
    handleInspect,
    handleDelete,
  } = props;
  const [displayComments, setDisplayComments] = useState(false);
  const [adminSettings, setAdminSettings] = useState(false);

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
          <div className="card__buttons">
            <div onClick={handleInspect} className="user-details">
              <img
                src={user.profile_picture}
                alt="profile picture"
                className="user-profile-picture"
              ></img>
              <h4 className="card__author">{user.username}</h4>
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

          <p className="card__snippet">{petPost.content}</p>
          {!form ? (
            <a onClick={handleForm} className="card__button">
              Comment?
            </a>
          ) : (
            <NewComment handleComment={handleComment} petPost={petPost} />
          )}
          <a
            onClick={() => setDisplayComments(!displayComments) && handleForm()}
            className="show-comments-button"
          >
            Comments ({comments.length})
          </a>
          {displayComments && (
            <div className="comments-section">{comments}</div>
          )}
          <p>{useFormatDateTime(petPost.registration_date)}</p>
        </figcaption>
      </figure>
    </div>
  );
}
