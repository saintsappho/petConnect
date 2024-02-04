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
        <div className="input-data textarea">
          <textarea
            id="new-title"
            className="input-data"
            value={title}
            onChange={handleTitleChange}
            rows="8" cols="20" required
          ></textarea>
          <div className="underline"></div>
          <label htmlFor="title">Title:</label>
        </div>
      </div>
      <div className="form-row">
         <div className="input-data textarea">
            <textarea id="new-content"
            value={content}
            onChange={handleContentChange}
            rows="8" cols="80" required></textarea>
            <br />
            <div className="underline"></div>
            <label htmlFor="">Write your message</label>
      <button className="bubbly-button submit" type="submit">Post!</button>
      </div>
    </div>
    </form>
  );
}
