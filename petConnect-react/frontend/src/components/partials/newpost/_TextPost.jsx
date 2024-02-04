/* eslint-disable react/prop-types */
export default function TextPost(props) {
  const {
    title,
    content,
    handleTitleChange,
    handleContentChange,
    handleSubmit,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="input-data">
          <input
            type="text"
            className="input-data"
            value={title}
            onChange={handleTitleChange}
          />
          <div className="underline"></div>
          <label htmlFor="title">Title:</label>
        </div>
      </div>
      <div className="form-row">
        <div className="input-data">
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
          ></textarea>
          <div className="underline"></div>
          <label htmlFor="content">Content:</label>
        </div>
      </div>

      <button className="bubbly-button" type="submit">Add Post</button>
    </form>
  );
}
