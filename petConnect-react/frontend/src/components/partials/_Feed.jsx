/* eslint-disable react/prop-types */
// dependencies
import { useState, useEffect } from "react";
// components
import PetPost from "./_PetPost.jsx";
// hooks
import useFetchData from "../../hooks/useFetchData.js";

export default function Feed(props) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const { user } = props;

  useFetchData("http://localhost:8080/posts", "posts", setPosts, setError);

  if (error) {
    return (
      <>
        <h1>Error fetching posts: {error}</h1>
        <p>[errorboxgif]</p>
      </>
    );
  }
  if (!posts.length) {
    return (
      <>
        <h1>No posts to show </h1>
        <p>[emptyboxgif]</p>
      </>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <PetPost key={post.post_ID} petPost={post} />
      ))}
    </div>
  );
}
