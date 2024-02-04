import { useState } from "react";
import TextPost from "./_TextPost";
import PhotoPost from "./_PhotoPost";
import axios from "axios";
// import { post } from '../../../../../backend/routes/users';

export default function AddPostForm() {
  //
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [style, setStyle] = useState("text-post");
  const [image, setImage] = useState(null);
  const [postData, setPostData] = useState({
    user_ID: 1, // hard-coded for now
    pet_ID: 1, // hard-coded for now
    title: title,
    content: content,
    style: style,
    image_file: image,
  });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleStyleChange = (e) => {
    setStyle(e.target.value);
    // console.log(e.target.value);
  };
  const handleImageUpload = (e) => {
    setImage(e.target.files[0]) && console.log("file uploaded");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setPostData({
        title: title,
        content: content,
        image_file: image,
      });
      const response = await axios.post(
        "http://localhost:8080/posts/",
        postData,
      );
      console.log("Post created:", response.data); // Handle success (show a message, redirect etc.)
      console.log("postData: ", postData); // Handle success (show a message, redirect etc.)
    } catch (error) {
      console.error("Error creating post:", error.message); // Handle error (show a message, log, etc.)
    }
  };

  return (
    <div className="new-post">
      <h1>Add a New Post</h1>
      <label htmlFor="style">Style:</label>
      <select id="style" value={style} onChange={handleStyleChange}>
        <option value="text-post">Text</option>
        <option value="photo-post">Photo</option>
        <option value="event-post">Event</option>
        <option value="poll-post">Poll</option>
        <option value="forum-post">Forum</option>
      </select>
      {style === "text-post" && (
        <TextPost
          handleTitleChange={handleTitleChange}
          handleContentChange={handleContentChange}
          handleSubmit={handleSubmit}
          title={title}
          content={content}
        />
      )}
      {style === "photo-post" && (
        <PhotoPost
          handleTitleChange={handleTitleChange}
          handleContentChange={handleContentChange}
          handleSubmit={handleSubmit}
          handleImageUpload={handleImageUpload}
          image={image}
          title={title}
          content={content}
        />
      )}
      {/* { style === "event-post" && <EventPost /> } */}
      {/* { style === "poll-post" && <PollPost /> } */}
      {/* { style === "forum-post" && <ForumPost /> } */}
    </div>
  );
}
