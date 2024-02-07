/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
export default function TextPost(props) {
  const { handleSubmit, handlePostStateChange, postState } = props;
  const { title, content } = postState;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="input-data textarea">
          <textarea
            id="new-title"
            className="input-data"
            value={title}
            onChange={() => {
              handlePostStateChange(event, "title");
            }}
            rows="8"
            cols="20"
            required
          ></textarea>
          <div className="underline"></div>
          <label htmlFor="new-title">Title:</label>
        </div>
      </div>
      <div className="form-row">
        <div className="input-data textarea">
          <textarea
            id="new-content"
            value={content}
            onChange={() => {
              handlePostStateChange(event, "content");
            }}
            rows="8"
            cols="80"
            required
          ></textarea>
          <br />
          <div className="underline"></div>
          <label htmlFor="new-content">Write your message</label>
        </div>
      </div>
      <button className="bubbly-button submit" type="submit">
        Post!
      </button>
    </form>
  );
}
