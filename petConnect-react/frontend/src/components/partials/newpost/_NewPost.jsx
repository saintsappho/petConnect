/* eslint-disable react/prop-types */
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
  //destructuring needed variables from props
  const { setPosts, useFetchData, setFetchError } = props;
  //
  const [postState, setPostState] = useState({
    user_ID: 1, // hard-coded for now
    pet_ID: 1, // hard-coded for now
    title: "",
    content: "", // content should be empty initially
    style: "text-post", // style should be set initially
    image_file: null,
  });

  const handlePostStateChange = (e, key) => {
    if (key === "image_file") {
      setPostState({
        ...postState,
        [key]: e, // Use the provided value directly for file inputs
      });
    } else {
      setPostState({
        ...postState,
        [key]: e.target.value, // Use e.target.value for text inputs
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the updated state in the axios requests
      const response = await axios.post(
        "http://localhost:8080/posts/",
        postState,
      );
      console.log("Post created:", response.data);
      console.log("postData: ", postState);
      setPosts((prev) => [...prev, response.data]);
      
      if (postState.style === "event-post") {
        const eventResponse = await axios.post(
          "http://localhost:8080/events/",
          postState,
        );
        console.log("Event created:", eventResponse.data);
        console.log("eventData: ", postState);
        setPosts((prev) => [...prev, eventResponse.data]);
      }
      // if (postState.style === "poll-post") {
      //   const pollResponse = await axios.post(
      //     "http://localhost:8080/polls/",
      //     postState,
      //   );
      //   console.log("poll created:", pollResponse.data);
      //   console.log("pollData: ", postState);
      //   setPosts((prev) => [...prev, pollResponse.data]);
      // }
      // if (postState.style === "forum-post") {
      //   const forumResponse = await axios.post(
      //     "http://localhost:8080/forums/",
      //     postState,
      //   );
      //   console.log("forum created:", forumResponse.data);
      //   console.log("forumData: ", postState);
      //   setPosts((prev) => [...prev, forumResponse.data]);
      // }
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };

  // destructure the postState for easier access
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
        {style === "event-post" && (
          <EventPost
            postState={postState}
            handlePostStateChange={handlePostStateChange}
            handleSubmit={handleSubmit}
          />
        )}
        {style === "poll-post" && (
          <PollPost
            postState={postState}
            handlePostStateChange={handlePostStateChange}
            handleSubmit={handleSubmit}
          />
        )}
        {style === "forum-post" && (
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
