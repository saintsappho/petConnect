const express = require("express");
const router = express.Router();
const { getPosts } = require("../db/queries/gets/getPosts");
const { newPost } = require("../db/queries/news/newPost");

// //SSE for live updates
// let clients = [];



// router.get('/posts/stream', (req, res) => {
//   res.setHeader('Content-Type', 'text/event-stream');
//   res.setHeader('Cache-Control', 'no-cache');
//   res.setHeader('Connection', 'keep-alive');

//   // Function to send a message
//   const clientId = Date.now();
//   const newClient = {
//     id: clientId,
//     res
//   };
//   clients.push(newClient);

//   // When client closes connection, remove them from the array
//   req.on('close', () => {
//     console.log(`${clientId} Connection closed`);
//     clients = clients.filter(client => client.id !== clientId);
//   });
// });

// Routes

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
    console.log("req.body", req.body);
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

module.exports = router;
