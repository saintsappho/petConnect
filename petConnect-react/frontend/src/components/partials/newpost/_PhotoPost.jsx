/* eslint-disable react/prop-types */
export default function PhotoPost(props) {
  const {
    handleSubmit,
    handlePostStateChange,
    postState
  } = props;
  const { image_file, content } = postState;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="input-data textarea">
          <label htmlFor="file">Upload your Photo:</label>
          <input
            className="input-data"
            type="file"
            id="file"
            value={image_file}
            onChange={()=>handlePostStateChange(event, "image_file")}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="input-data textarea">
          <textarea
            id="new-content"
            value={content}
            onChange={()=>{handlePostStateChange(event, "content")}}
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
