/* eslint-disable no-unused-vars */
import { useState } from "react";
//  components
import TextPost from "./_TextPost";
import PhotoPost from "./_PhotoPost";
import EventPost from "./_EventPost";
import ForumPost from "./_ForumPost";
import PollPost from "./_PollPost";
import axios from "axios";
// styles
import "../../../styles/NewPost.scss";

// import { post } from '../../../../../backend/routes/users';

export default function AddPostForm(props) {
  const { setPosts, useFetchData, setFetchError } = props;
  //
  const [postState, setPostState] = useState({
    user_ID: 1, // hard-coded for now
    pet_ID: 1, // hard-coded for now
    title: "",
    content: "", // content should be empty initially
    style: "text-post", // style should be set initially
    image_file: null,
  })
  
  const handlePostStateChange = (e, key) => {
    if (key === "image_file") {
      setPostState({
        ...postState,
        [key]: e,  // Use the provided value directly for file inputs
      });
    } else {
      setPostState({
        ...postState,
        [key]: e.target.value,  // Use e.target.value for text inputs
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the updated state in the axios request
      const response = await axios.post(
        "http://localhost:8080/posts/",
        postState
      );
      console.log("Post created:", response.data);
      console.log("postData: ", postState);
      setPosts((prev)=> [...prev, response.data]);
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };

  // Larry's code
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("got here", postState)
  //   // Create an instance of FormData
  //   const formData = new FormData();
  //   console.log("1",[...formData]);
  //   // Append text fields from the state to formData
  //   formData.append("title", postState.title);
  //   formData.append("content", postState.content);
  //   formData.append("style", postState.style);
  //   // Assuming user_ID and pet_ID might be dynamic or coming from another part of the app in the future
  //   formData.append("user_ID", postState.user_ID); 
  //   formData.append("pet_ID", postState.pet_ID);
  //   console.log("2",[...formData]);
  //   // Append the file if it exists
  //   if (postState.image_file) {
  //     formData.append("image_file", postState.image_file);
  //     console.log("phototesttttt",[...formData]);
  //   }
  
  //   try {
  //     // Using axios to post the formData
  //     // Note: You might need to adjust the headers depending on backend setup
  //     const response = await axios.post("http://localhost:8080/posts/", formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });
  //     console.log("Post created:", response.data);
  //     // Optionally, clear the form or indicate success to the user
  //   } catch (error) {
  //     console.error("Error creating post:", error.message);
  //   }
  // };



  const { user_ID, pet_ID, style, content, title, image_file } = postState;

  return (
    <div className="new-post-panel">
      <h1 className="text">Add a New Post</h1>
      <div>
        <label htmlFor="style">Style:</label>
        <select
          className="input-data"
          id="style"
          value={style} //  Use postState.style
          onChange={(e) => handlePostStateChange(e, "style")} // Pass target as "style"
        >
          <option value="text-post">Text</option>
          <option value="photo-post">Photo</option>
          <option value="event-post">Event</option>
          <option value="poll-post">Poll</option>
          <option value="forum-post">Forum</option>
        </select>
        <div className="underline"></div>
        {style === "text-post" && (
          <TextPost
            postState={postState}
            handlePostStateChange={handlePostStateChange}
            handleSubmit={handleSubmit}
          />
        )}
        {style === "photo-post" && (
          <PhotoPost
            postState={postState}
            handlePostStateChange={handlePostStateChange}
            handleSubmit={handleSubmit}
          />
        )}
        { style === "event-post" && (
          <EventPost
            postState={postState}
            handlePostStateChange={handlePostStateChange}
            handleSubmit={handleSubmit}
          />
        )}
        { style === "poll-post" && (
          <PollPost
            postState={postState}
            handlePostStateChange={handlePostStateChange}
            handleSubmit={handleSubmit}
          />
        )}
        { style === "forum-post" && (
          <ForumPost
            postState={postState}
            handlePostStateChange={handlePostStateChange}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}