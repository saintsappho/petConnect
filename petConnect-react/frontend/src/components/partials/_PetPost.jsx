// import React, { useCallback, useState } from "react";

export default function PetPost(props) {
  const { petPost } = props;
  // console.log('PetPost:', petPost);
  if (petPost.style === "text") {
    return (
      <div className="card">
        <figure className="card__thumb">
          <img
            src="https://source.unsplash.com/qXMpNtNp1uE/300x510"
            alt="Picture by David Monje"
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

  if (petPost.style === "photo") {
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
  if (petPost.style === "poll") {
    return (
      <div className="card">
        <figure className="card__thumb">
          <img
            src={
              petPost.image_file ||
              "https://source.unsplash.com/3THn0EN_Ydo/300x510"
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
  if (petPost.style === "event") {
    return (
      
        <div className="card">
          <figure className="card__thumb">
            <img
              src={
                petPost.image_file ||
                "https://source.unsplash.com/71u2fOofI-U/300x510"
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
  if (petPost.style === "forum") {
    return (
      
        <div className="card">
          <figure className="card__thumb">
            <img
              src={
                petPost.image_file ||
                "https://source.unsplash.com/3THn0EN_Ydo/300x510"
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
