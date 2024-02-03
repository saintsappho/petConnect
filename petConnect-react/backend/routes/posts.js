const express = require("express");
const router = express.Router();
const { getPosts } = require("../db/queries/gets/getPosts");
const { newPost } = require("../db/queries/news/newPost");

router.get("/", async (req, res) => {
  try {
    const posts = await getPosts();
    console.log(posts);
    res.send(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const postData = {
      user_ID: 1, // hard-coded for now
      pet_ID: 1, // hard-coded for now
      title: `Demo Post Confirming Post Route Works`,
      content: `this is a test of the automated post route system. If you see this, it worked!`,
      style: `text-post`,
      sub_ID: 1, // hard-coded for now
      imageURL: null, // hard-coded for now
    } 
    const thisPost = await newPost(postData);
    res.status(201).json(thisPost);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to Post");
  }
});

module.exports = router;
// module.exports = { makeNewPost };
