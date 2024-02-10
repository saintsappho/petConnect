/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react'

export default function NewComment(props) {
  const { petPost } = props
  const [comment, setComment] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const commentData = { 
        post_ID: petPost.post_id,
        user_ID: 1,
        content: comment
      }
      console.log("commentData", commentData)
      const response = await axios.post(`http://localhost:8080/comments`, {commentData})
      console.log("response", response)
    } catch (error) {
      console.error("Error posting comment", error.message)
    }
  }

  return(
    <form>
      <div className="comment-box">
        <label htmlFor="comment">Comment</label>
        <textarea
          className="form-control"
          id="comment"
          name="comment"
          value={comment.content}
          onChange={(e) => setComment(e.target.value)}
          rows="3"
          required
          placeholder="Write a comment..."
        ></textarea>
      </div>
      <button onClick={handleSubmit} type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>

  )
}