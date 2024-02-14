/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

// dependencies
import { useState, useEffect } from "react";
// components
import PetPost from "./_PetPost.jsx";
// hooks

export default function Feed({ user, posts, error, showAddPetForm }) {

  //still NO IDEA why this is flipping the order of the posts
  //happens whenever i open new post form

  // trick for setting posts for followers
  // const feedPosts = posts.filter((post) => post.user_id === user.user_id);

  if (error) {
    return (
      <>
        <h1>Error fetching posts: {error}</h1>
        <img src="../../assets/empty.gif" alt="" />
      </>
    );
  }
  if (!posts.length) {
    return (
      <>
        <h1>No posts to show </h1>
        <img src="../../assets/empty.gif" alt="" />
      </>
    );
  }

  return (
    <div className="feed-container">
      {posts.reverse().map(
        (post) => (<PetPost user_id={user.user_id} key={post.post_id} petPost={post} />),
      )}
    </div>
  );
}
