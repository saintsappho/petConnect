import React, { useCallback, useState } from 'react';
import "../styles/PhotoListItem.scss";
import PhotoFavButton from "./PhotoFavButton";
import PhotoDetailsModal from "../routes/PhotoDetailsModal";

const PhotoListItem = (props) => {
  const { photos, faves, modality } = props
  const { urls, user, id, location } = photos;
  const { city, country } = location;
  const { regular } = urls;
  const { profile, username } = user;
  const { modalToggle } = modality

  return (
    <article className="photo-list__item" key={"photo" + id}>
      <PhotoFavButton faves={faves} id={Number(id)} />
      <img onClick={()=> {modalToggle(photos)}} className="photo-list__image" src={regular} alt={`Photo ${id}: Location ${city}, ${country}`} />
      <div className="photo-list__user-details">
        <img className="photo-list__user-profile" key={username + id} src={profile} alt={`${username}'s profile`} />
        <div className="photo-list__user-info">
          <div className="">{user.name}</div> {/* this can also be username*/}
          <div className="photo-list__user-location"> {city}, {country}</div>
        </div>
      </div>
      
    </article>
  );
};

export default PhotoListItem;
