/* eslint-disable react/prop-types */
// dependencies
import { useState, useEffect } from "react";
// components
import PetPost from "./_PetPost.jsx";
// hooks
import useFetchData from "../../hooks/useFetchData.js";

export default function Feed(props) {
  const [posts, setPosts] = useState();
  const { user } = props;

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await useFetchData("http://localhost:8080/posts");
        setPosts(response.data); // Update the posts state with the fetched data
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    }
    fetchPosts();
  }, [posts]); // Run only if posts changes

  if (!posts) return (<>
      <h1>No posts to show </h1>
      <p>[emptyboxgif]</p>
    </>
    );
  if (posts) return (
    <div>
      {posts.map((post) => (
        <PetPost key={post.post_ID} petPost={post} />
      ))}
    </div>
  );
}
