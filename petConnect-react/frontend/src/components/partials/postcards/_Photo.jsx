/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import useFormatDateTime from "../../../assets/helpers/formatDateTime";

export default function Photo(props) {
  const { petPost } = props;

  return (
    <div className="card">
      <figure className="card__thumb">
        <img
          src={petPost.image_file}
          alt={petPost.content}
          className="card__image"
        ></img>
        <figcaption className="card__caption">
          <p className="card__snippet">{petPost.content}</p>
          <a className="card__button">
            Thoughts?
          </a>
          <p>{useFormatDateTime(petPost.registration_date)}</p>
        </figcaption>
      </figure>
    </div>
  );
}
