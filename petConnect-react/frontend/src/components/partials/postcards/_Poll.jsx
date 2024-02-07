/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import useFormatDateTime from "../../../assets/helpers/formatDateTime";

export default function Poll(props) {
  const { randomImage, petPost } = props;

  return (
    <div className="card">
      <figure className="card__thumb">
        <img
          src={petPost.image_file || randomImage()}
          alt={petPost.content}
          className="card__image"
        ></img>
        <figcaption className="card__caption">
          <h2 className="card__title">{petPost.title}</h2>
          <p className="card__snippet">{petPost.content}</p>
          <a className="card__button">
            Vote Now!
          </a>
          <p>{useFormatDateTime(petPost.registration_date)}</p>
        </figcaption>
      </figure>
    </div>
  );
}
