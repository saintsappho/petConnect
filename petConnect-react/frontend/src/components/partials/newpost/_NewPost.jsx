import { useState } from "react";
import TextPost from "./_TextPost";
import PhotoPost from "./_PhotoPost";
import axios from "axios";
// import { post } from '../../../../../backend/routes/users';

export default function AddPostForm () {
  //
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [style, setStyle] = useState("text-post");
  const [postData, setPostData] = useState({
    user_ID: 1, // hard-coded for now
    pet_ID: 1, // hard-coded for now
    title: `${title}`,
    content: `${content}`,
    style: `${style}`,
    sub_ID: 1, // hard-coded for now
    imageURL: null, // hard-coded for now
  });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleStyleChange = (e) => {
    setStyle(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPostData(
      setTitle(title),
      setContent(content)
    )
    console.log('postData:', postData); // Handle success (show a message, redirect etc.
    try {
      const response = await axios.post('http://localhost:8080/posts/', {
        user_ID: 1, //hard-coded for now
        pet_ID: 1, 
        title: 'Demo Post', 
        content: content,
        style: postData.style, 
        sub_ID: 1, 
        imageURL: postData.imageURL, 
      });
      console.log('Post created:', response.data); // Handle success (show a message, redirect etc.)
     
    } catch (error) {
      console.error('Error creating post:', error.message); // Handle error (show a message, log, etc.)
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
          title={title}
          content={content}
        />
      )}
      {/* { style === "event-post" && <EventPost /> } */}
      {/* { style === "poll-post" && <PollPost /> } */}
      {/* { style === "forum-post" && <ForumPost /> } */}
    </div>
  );
};


