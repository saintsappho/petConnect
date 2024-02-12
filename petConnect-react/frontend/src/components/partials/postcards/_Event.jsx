/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import useFetchData from "../../../hooks/useFetchData";
import formatDateTime from "../../../assets/helpers/formatDateTime";

export default function Event(props) {
  const { randomImage, petPost, user } = props;
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(null);

  useFetchData(
    `http://localhost:8080/events/${petPost.post_id}`,
    "events",
    setEvents,
    setError,
  );
  
  useFetchData(`http://localhost:8080/events/${petPost.post_id}`, "events", setEvents, setError);

  
  return (
    <div className="card">
      <figure className="card__thumb">
        <img
          src={petPost.image_file || randomImage()}
          alt={petPost.content}
          className="card__image"
        ></img>
        <figcaption className="card__caption">
          {events && (
            <>
              <h2 className="card__title">{events[0].title}</h2>
              <div className="user-details">
                <h4 className="card__author">{user.username}</h4>
              </div>
              <p className="card__start-date">
                {formatDateTime(events[0].event_date)}
              </p>
              <p className="card__location">{events[0].event_location}</p>
              <p className="card__snippet">{events[0].event_description}</p>
              <a className="card__button">You In?</a>
            </>
          )}
        </figcaption>
      </figure>
    </div>
  );
}
