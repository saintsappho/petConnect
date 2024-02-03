export default function TextPost(props) {
  const { content, handleTitleChange, handleContentChange, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="file">Photo:</label>
      <input type="file" id="file" onChange={handleTitleChange} />

      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        value={content}
        onChange={handleContentChange}
      ></textarea>
      <button type="submit">Add Post</button>
    </form>
  );
}