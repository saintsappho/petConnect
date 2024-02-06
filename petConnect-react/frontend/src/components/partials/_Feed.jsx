/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

// dependencies
import { useState, useEffect } from "react";
// components
import PetPost from "./_PetPost.jsx";
// hooks

export default function Feed(props) {
  const { user, posts, error } = props;

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
