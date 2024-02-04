/* eslint-disable react/prop-types */
export default function TextPost(props) {
  const { title, content, handleTitleChange, handleContentChange, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" value={title} onChange={handleTitleChange} />

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
