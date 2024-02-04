/* eslint-disable react/prop-types */
// dependencies
import { useState, useEffect } from "react";
// components
import PetPost from "./_PetPost.jsx";
// hooks
import useFetchData from "../../hooks/useFetchData.js";

export default function Feed(props) {
  const { user } = props;
  
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  useFetchData("http://localhost:8080/posts", "posts", setPosts, setError);
  useEffect(() => {
    console.log("Fetched posts:", posts);
  }, [posts]);
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
        console.log(`this time it mapped this post: ${post.post_id + post.user_id}`),
        <PetPost key={post.post_id } petPost={post} />
      ))}
    </div>
  );
}
