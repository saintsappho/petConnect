/* eslint-disable react/prop-types */
export default function PhotoPost(props) {
  const { content, handleContentChange, handleSubmit, handleImageUpload } =
    props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="input-data textarea">
          <label htmlFor="file">Photo:</label>
          <input
            className="input-data"
            type="file"
            id="file"
            onChange={handleImageUpload}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="input-data textarea">
          <textarea
            id="new-content"
            value={content}
            onChange={handleContentChange}
            rows="8"
            cols="80"
            required
          ></textarea>
          <br />
          <div className="underline"></div>
          <label htmlFor="">Caption</label>
        </div>
      </div>
      <button className="submit bubbly-button" type="submit">
        Post!
      </button>
    </form>
  );
}
