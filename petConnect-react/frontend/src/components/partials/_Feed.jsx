/* eslint-disable react/prop-types */
// dependencies
import React, {useState, useEffect} from 'react';
import axios from 'axios';
// components
import PetPost from './_PetPost.jsx';

export default function PetPostList () {
  const [posts, setPosts] = useState([]);

  const fetchData = async (url, target) => {
    try {
      const response = await axios.get(url);
      setPosts(response.data);
    } catch (error) {
      console.error(`Error fetching data from ${target}:`, error.message);
    }
  };
  useEffect(() => {
    fetchData("http://localhost:8080/posts/", "posts");
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <PetPost key={post.id} petPost={post} />
      ))}
    </div>
  );
}

