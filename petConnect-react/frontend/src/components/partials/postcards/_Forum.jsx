/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
export default function Forum(props) {
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
            Be Heard!
          </a>
        </figcaption>
      </figure>
    </div>
  );
}
