/* eslint-disable react/prop-types */
// dependencies
import { useState, useEffect } from "react";
// components
import PetPost from "./_PetPost.jsx";
// hooks
import useFetchData from "../../hooks/useFetchData.js";

export default function Feed(props) {
  const { user, setPosts, posts, error } = props;

  
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
      {posts.reverse().map((post) => (
        console.log('post:', post),
        <PetPost key={post.post_id} petPost={post} />
      ))}
    </div>
  );
}
