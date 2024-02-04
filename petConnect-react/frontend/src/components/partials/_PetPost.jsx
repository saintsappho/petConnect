// import React, { useCallback, useState } from "react";

export default function PetPost(props) {
  const { petPost } = props;
  // console.log('PetPost:', petPost);
  if (petPost.style === "text") {
    return (
      <div class="card">
        <figure class="card__thumb">
          <img
            src="https://source.unsplash.com/3THn0EN_Ydo/300x510"
            alt="Picture by David Monje"
            class="card__image"
          ></img>
          <figcaption class="card__caption">
            <h2 class="card__title">{petPost.title}</h2>
            <p class="card__snippet">{petPost.content}</p>
            <a href="" class="card__button">
              Read more
            </a>
          </figcaption>
        </figure>
      </div>
    );
  }

  if (petPost.style === "photo") {
    return (
      <div class="card">
        <figure class="card__thumb">
          <img
            src={petPost.image_file}
            alt={petPost.content}
            class="card__image"
          ></img>
          <figcaption class="card__caption">
            <h2 class="card__title">{petPost.title}</h2>
            <p class="card__snippet">{petPost.content}</p>
            <a href="" class="card__button">
              Read more
            </a>
          </figcaption>
        </figure>
      </div>
    );
  }
  if (petPost.style === "poll") {
    return (
      <div class="card">
        <figure class="card__thumb">
          <img
            src={
              petPost.image_file ||
              "https://source.unsplash.com/3THn0EN_Ydo/300x510"
            }
            alt={petPost.content}
            class="card__image"
          ></img>
          <figcaption class="card__caption">
            <h2 class="card__title">{petPost.title}</h2>
            <p class="card__snippet">{petPost.content}</p>
            <a href="" class="card__button">
              Read more
            </a>
          </figcaption>
        </figure>
      </div>
    );
  }
  if (petPost.style === "event") {
    return (
      
        <div class="card">
          <figure class="card__thumb">
            <img
              src={
                petPost.image_file ||
                "https://source.unsplash.com/3THn0EN_Ydo/300x510"
              }
              alt={petPost.content}
              class="card__image"
            ></img>
            <figcaption class="card__caption">
              <h2 class="card__title">{petPost.title}</h2>
              <p class="card__snippet">{petPost.content}</p>
              <a href="" class="card__button">
                Read more
              </a>
            </figcaption>
          </figure>
        </div>
    );
  }
  if (petPost.style === "forum") {
    return (
      
        <div class="card">
          <figure class="card__thumb">
            <img
              src={
                petPost.image_file ||
                "https://source.unsplash.com/3THn0EN_Ydo/300x510"
              }
              alt={petPost.content}
              class="card__image"
            ></img>
            <figcaption class="card__caption">
              <h2 class="card__title">{petPost.title}</h2>
              <p class="card__snippet">{petPost.content}</p>
              <a href="" class="card__button">
                Read more
              </a>
            </figcaption>
          </figure>
        </div>
    );
  }
}
