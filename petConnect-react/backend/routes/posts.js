const express = require("express");
const router = express.Router();
const { deletePostByID } = require("../db/queries/deletes/deletePost"
)
const { getPosts, getPostByID } = require("../db/queries/gets/getPosts");
const { newPost } = require("../db/queries/posts/newPost");

router.get("/", async (req, res) => {
  try {
    const posts = await getPosts();
    // console.log(posts);
    res.send(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to get Posts");
  }
});

router.post("/", async (req, res) => {
  try {
    // console.log("req.body", req.body);
    const postData = {
      user_ID: 1, // hard-coded for now
      pet_ID: 1, // hard-coded for now
      title: req.body.title,
      content: req.body.content,
      style: req.body.style,
      image_file: req.body.image_file 
    } 
    const thisPost = await newPost(postData);
    res.status(201).json(thisPost);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to create Post");
  }
});

router.delete("/:postId/delete", async (req, res) => {
  try {
    const postId = req.params.postId;
    
    // Check if the post with the given ID exists before attempting deletion
    const existingPost = await getPostByID(postId);
    
    if (!existingPost || existingPost.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Delete the post by ID
    const deletedPost = await deletePostByID(postId);

    res.status(200).json({ message: "Post deleted successfully", deletedPost });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to delete post");
  }
});

router.put('/:postId', async (req, res) => {
  const postId = req.params.postId;
  const updatedPostData = req.body; // Assuming the updated post data is sent in the request body
  
  try {
    // Fetch the existing post from the database
    const existingPost = await getPostByID(postId);
    
    if (!existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Update the post data
    existingPost.title = updatedPostData.title;
    existingPost.content = updatedPostData.content;
    // ... other fields ...
    
    // Save the updated post to the database
    const updatedPost = await existingPost.save();
    
    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;