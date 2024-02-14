/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
//  components
import TextPost from "./_NewTextPost";
import PhotoPost from "./_NewPhotoPost";
import EventPost from "./_NewEventPost";
import ForumPost from "./_NewForumPost";
import PollPost from "./_NewPollPost";
// styles
import "../../../styles/NewPost.scss";

// import { post } from '../../../../../backend/routes/users';
export default function AddPostForm(props) {
  //destructuring needed variables from props
  const { setPosts, create, setCreate } = props;
  //
  const [numChoices, setNumChoices] = useState(2);
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
        [key]: e,
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
      const response = await axios.post(
        "http://localhost:8080/posts/",
        postState,
      );
      setPosts((prev) => [...prev, response.data]);
      const newPostId = response.data.post_id;
      if (postState.style === "event-post") {
        const updatedPostState = {
          ...postState,
          post_ID: newPostId,
        };
        const eventResponse = await axios.post(
          "http://localhost:8080/events/",
          updatedPostState,
        );
        setPosts((prev) => [...prev, eventResponse.data]);
      }

      if (postState.style === "poll-post") {
        const updatedPostState = {
          ...postState,
          poll_ID: newPostId,
          numChoices: numChoices,
        };
        const pollResponse = await axios.post(
          "http://localhost:8080/polls/",
          updatedPostState,
        );
        setPosts((prev) => [...prev, pollResponse.data]);
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setPostState({
        user_ID: 1, // hard-coded for now
        pet_ID: 1, // hard-coded for now
        title: "",
        content: "", // content should be empty initially
        style: "text-post", // style should be set initially
        image_file: null,
      });
      setTimeout(() => {
        setCreate(!create); // Close the form after submission
      }, 500);
    }
  };

  // destructure the postState for easier access
  const { style } = postState;
  return (
    <div className="new-post-panel">
      <button className="close" onClick={() => setCreate(!create)}>
        &times;
      </button>
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
            numChoices={numChoices}
            setNumChoices={setNumChoices}
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
