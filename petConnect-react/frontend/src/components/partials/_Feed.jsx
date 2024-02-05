/* eslint-disable react/prop-types */
// dependencies
import { useState, useEffect } from "react";
// components
import PetPost from "./_PetPost.jsx";
// hooks

export default function Feed(props) {
  const { user, posts, error } = props;

  // when this useEffect starts working, remove the reverse from the array.map in the return statement
  // useEffect(() => {
  //   const eventSource = new EventSource("http://localhost:8080/posts/stream");
  //   console.log(
  //     "remember to remove the reverse from the array.map in the return statement",
  //   );
  //   eventSource.onmessage = function (event) {
  //     const newPost = JSON.parse(event.data);
  //     setPosts((prevPosts) => [newPost, ...prevPosts]); // Add newPost to the beginning
  //   };
  //   return () => {
  //     eventSource.close(); // Close connection when component unmounts
  //   };
  // }, [posts]); // Notice that we add setPosts here to ensure correctness. Adjust if necessary, especially if setPosts changes or is re-created on re-renders.

  if (error) {
    return (
      <>
        <h1>Error fetching posts: {error}</h1>
        <img src="../../assets/empty.gif" alt="empty box gif" />
      </>
    );
  }
  if (!posts.length) {
    return (
      <>
        <h1>No posts to show </h1>
        <img src="../../assets/empty.gif" alt="empty box gif" />
      </>
    );
  }

  return (
    <div className="container">
      {posts.reverse().map(
        (post) => (<PetPost key={post.post_id} petPost={post} />),
      )}
    </div>
  );
}
