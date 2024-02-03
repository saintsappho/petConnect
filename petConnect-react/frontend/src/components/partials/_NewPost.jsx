import React, { useState } from 'react';
import TextPost from './_TextPost';
import PhotoPost from './_PhotoPost';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const [style, setStyle] = useState('default');

  const handleStyleChange = (e) => {
    setStyle(e.target.value);
    if (e.target.value === "text-post") {
      console.log("text-post");
    }
    if (e.target.value === "photo-post") {
      console.log("photo-post");
    } 
    if (e.target.value === "event-post") {
      console.log("event-post");
    } 
    if (e.target.value === "poll") {
      console.log("poll");
    } 
    if (e.target.value === "forum") {
      console.log("forum");
    } 
  };  

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios.post()
    // Add your logic here to handle the form submission
    // For example, you can make an API call to save the new post
    console.log('New post:', { title, content });
    setTitle('');
    setContent('');
  };

  return (
    <div className='new-post'>
      <h1>Add a New Post</h1>
      <label htmlFor="style">Style:</label>
      <select id="style" value={style} onChange={handleStyleChange}>
        <option value="text-post">Text</option>
        <option value="photo-post">Photo</option>
        <option value="event-post">Event</option>
        {/* <option value="poll-post">Poll</option> */}
        {/* <option value="forum-post">Forum</option> */}
      </select>
    { style === "text-post" && <TextPost 
    handleTitleChange={handleTitleChange} 
    handleContentChange={handleContentChange} 
    handleSubmit={handleSubmit} 
    title={title}
    content={content}/> }
    { style === "photo-post" && <PhotoPost
    handleTitleChange={handleTitleChange} 
    handleContentChange={handleContentChange} 
    handleSubmit={handleSubmit} 
    title={title}
    content={content}/> }
    {/* { style === "event-post" && <EventPost /> } */}
    {/* { style === "poll-post" && <PollPost /> } */}
    {/* { style === "forum-post" && <ForumPost /> } */}
      

     
    </div>
    
  );
};

export default AddPostForm;