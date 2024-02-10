/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
// import useFetchData from "../../hooks/useFetchData";
//components
import Event from "./postcards/_Event.jsx";
import Forum from "./postcards/_Forum.jsx";
import Photo from "./postcards/_Photo.jsx";
import Poll from "./postcards/_Poll.jsx";
import Text from "./postcards/_Text.jsx";
import axios from "axios";

export default function PetPost(props) {
  const { petPost } = props;
  const [comments, setComments] = useState([])
  const [refreshComments, setRefreshComments] = useState(false)
  const [user, setUser] = useState([{}])
  
  const randomImage = () => {
    return `https://source.unsplash.com/random/300x510?${
      petPost.title || "pet"
    }`;
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/users/${petPost.user_id}`)
    .then((response) => {
      setUser(response.data[0])
    })
  }, [])

  console.log("user", user)

  useEffect(() => {
    axios.get(`http://localhost:8080/comments/${petPost.post_id}`)
    .then((response) => {
      setComments(response.data.map((comment, index) => {
        if (index > 2) index++;
        return (<div className="comment" key={comment.comment_ID}> {comment.content}</div>)
      }))
    })
  }, [refreshComments])

  const handleComment = () => {
    setRefreshComments(!refreshComments)
  }
  
  return (
    <>
      {petPost.style === "text-post" && (
        <Text user={user} petPost={petPost} handleComment={handleComment} randomImage={randomImage} comments={comments} />
      )}
      {petPost.style === "photo-post" && (
        <Photo user={user} petPost={petPost} handleComment={handleComment} comments={comments}/>
        
      )}
      {petPost.style === "poll-post" && (
        <Poll user={user} petPost={petPost} randomImage={randomImage} />
      )}
      {petPost.style === "forum-post" && (
        <Forum user={user} petPost={petPost} handleComment={handleComment} randomImage={randomImage} comments={comments}/>
        
      )}
      {petPost.style === "event-post" && (
        <Event user={user} petPost={petPost} randomImage={randomImage} />
      )}
    </>
  );
}
