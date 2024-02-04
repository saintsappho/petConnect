import React, { useEffect, useState } from "react";

export default function PetPost(props) {
  const { petPost } = props;
  const [ imageSrc, setImageSrc ] = useState(null);


  if (petPost.style === "text-post") {
    return (
      <div className="card">
        <figure className="card__thumb">
          <img
            src="https://source.unsplash.com/random/300x510"
            alt="Random image from unsplash"
            className="card__image"
          ></img>
          <figcaption className="card__caption">
            <h2 className="card__title">{petPost.title}</h2>
            <p className="card__snippet">{petPost.content}</p>
            <a href="" className="card__button">
              Read more
            </a>
          </figcaption>
        </figure>
      </div>
    );
  }

  if (petPost.style === "photo-post") {
    return (
      <div className="card">
        <figure className="card__thumb">
          <img
            src={petPost.image_file}
            alt={petPost.content}
            className="card__image"
          ></img>
          <figcaption className="card__caption">
            <h2 className="card__title">{petPost.title}</h2>
            <p className="card__snippet">{petPost.content}</p>
            <a href="" className="card__button">
              Read more
            </a>
          </figcaption>
        </figure>
      </div>
    );
  }
  if (petPost.style === "poll-post") {
    return (
      <div className="card">
        <figure className="card__thumb">
          <img
            src={
              petPost.image_file ||
              "https://source.unsplash.com/random/300x510"
            }
            alt={petPost.content}
            className="card__image"
          ></img>
          <figcaption className="card__caption">
            <h2 className="card__title">{petPost.title}</h2>
            <p className="card__snippet">{petPost.content}</p>
            <a href="" className="card__button">
              Read more
            </a>
          </figcaption>
        </figure>
      </div>
    );
  }
  if (petPost.style === "event-post") {
    return (
      
        <div className="card">
          <figure className="card__thumb">
            <img
              src={
                petPost.image_file ||
                "https://source.unsplash.com/random/300x510"
              }
              alt={petPost.content}
              className="card__image"
            ></img>
            <figcaption className="card__caption">
              <h2 className="card__title">{petPost.title}</h2>
              <p className="card__snippet">{petPost.content}</p>
              <a href="" className="card__button">
                Read more
              </a>
            </figcaption>
          </figure>
        </div>
    );
  }
  if (petPost.style === "forum-post") {
    return (
      
        <div className="card">
          <figure className="card__thumb">
            <img
              src={
                petPost.image_file ||
                "https://source.unsplash.com/random/300x510"
              }
              alt={petPost.content}
              className="card__image"
            ></img>
            <figcaption className="card__caption">
              <h2 className="card__title">{petPost.title}</h2>
              <p className="card__snippet">{petPost.content}</p>
              <a href="" className="card__button">
                Read more
              </a>
            </figcaption>
          </figure>
        </div>
    );
  }
}
