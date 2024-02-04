/* eslint-disable react/prop-types */
export default function PhotoPost(props) {
  const { content, handleContentChange, handleSubmit, handleImageUpload } = props;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="file">Photo:</label>
      <input className="input-data" type="file" id="file" onChange={handleImageUpload} />

      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        value={content}
        onChange={handleContentChange}
      ></textarea>
      <button className="bubbly-button" type="submit">Add Post</button>
    </form>
  );
}