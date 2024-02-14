/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import useFetchData from "../../../hooks/useFetchData";
import formatDateTime from "../../../assets/helpers/formatDateTime";
import CalendarEvent from "../../modals/CalendarEvent";
import DeleteButton from "../buttons/_DeleteButton.jsx";

export default function Event(props) {
  const { randomImage, petPost, user, handleInspect, handleDelete } = props;
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminSettings, setAdminSettings] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useFetchData(
    `http://localhost:8080/events/${petPost.post_id}`,
    "events",
    setEvents,
    setError,
  );

  useFetchData(
    `http://localhost:8080/events/${petPost.post_id}`,
    "events",
    setEvents,
    setError,
  );

  return (
    <>
      {isModalOpen && <CalendarEvent onClose={closeModal} />}
      <div className="card">
        <figure className="card__thumb">
          <img
            src={randomImage()}
            alt={petPost.content}
            className="card__image"
          ></img>
          <figcaption className="card__caption">
            {events && events.length > 0 && (
              <>
                <h2 className="card__title">{events[0].title}</h2>
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
                          <button className="edit-button bubbly-button">
                            Edit
                          </button>
                          <DeleteButton
                            handleDelete={handleDelete}
                            postId={petPost.post_id}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <p className="card__start-date">
                  {formatDateTime(events[0].event_date)}
                </p>
                <p className="card__location">{events[0].event_location}</p>
                <p className="card__snippet">{events[0].event_description}</p>
                <a className="card__button" onClick={openModal}>
                  You In?
                </a>
              </>
            )}
          </figcaption>
        </figure>
      </div>
    </>
  );
}
