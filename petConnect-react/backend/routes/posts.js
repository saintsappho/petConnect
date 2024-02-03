const express = require('express');
const router  = express.Router();
const { getPosts } = require('../db/queries/gets/getPosts');
const { newPost } = require('../db/queries/news/newPost');

// const makeNewPost = (user_ID, pet_ID, style, sub_ID, registration_date, imageURL) => {
//   return db.query(
//     `INSERT INTO posts (
//       user_ID, 
//       pet_ID, 
//       style, 
//       sub_ID, 
//       registration_date, 
//       imageURL
//     ) VALUES ($1, $2, $3, $4, $5, $6) 
//     RETURNING *;`
//     // The RETURNING * clause returns the inserted row, you can customize it if needed
//     // Make sure to pass the correct number of parameters and in the correct order
//     , [user_ID, pet_ID, style, sub_ID, registration_date, imageURL]
//   )
//   .then(data => {
//     return data.rows[0]; // Assuming you want to return the inserted row
//   })
//   .catch(error => {
//     throw error; // Rethrow the error for handling in the calling function
//   });
// };
// usage example
// const result = await newPost(user_ID, pet_ID, style, sub_ID, registration_date, imageURL);
// console.log('Inserted post:', result);

router.get('/', async (req, res) => {
  try {
    const posts = await getPosts()
    console.log(posts)
    res.send(posts)
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// router.post('/', async (req, res) => {
  //   try {
    //     const posts = await newPost(post)
    //     console.log(posts)
    //     res.send(posts)
    //   } catch (err) {
      //     console.error(err);
      //     res.status(500).send('Internal Server Error');
      //   }
      // });
      
module.exports = router;
// module.exports = { makeNewPost };
