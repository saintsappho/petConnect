/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
export default function Text(props) {
  const { randomImage, petPost } = props;
  
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
          <p className="card__snippet">{petPost.content}</p>
          <a className="card__button">
            Comment?
          </a>
        </figcaption>
      </figure>
    </div>
  );
}
