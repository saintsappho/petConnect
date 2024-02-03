const express = require("express");
const router = express.Router();
const { getUsers } = require("../db/queries/gets/getUsers");
// const db = require('../db');
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    console.log(users);
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// router.post("/", [check("users.sub").isString()], async (req, res) => {
//   try {
//     // Validate request body
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       console.log("Validation errors:", errors.array());
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { user } = req.body;
//     console.log("User from frontend:", user);
//     // Check if the user exists in the db with a 'sub'
//     const existingUser = await db("users").where({ sub_ID: user.sub }).first();

//     if (existingUser) {
//       console.log("Existing user found:", existingUser);
//       // if user exists, send to the frontend
//       return res.status(200).json({ user_ID: existingUser.id });
//     } else {
//       console.log("Creating a new user:", user.sub);
//       // if user doesn't exist, create a new user in the db
//       const [newUserID] = await db("users").insert({ sub_ID: user.sub });

//       // once created, grab new user from the db
//       const newUser = await db("users").where("id", newUserID).first();

//       // Send to frontend
//       req.session.userID = newUserID;
//       console.log("New user created:", newUser);
//       return res.status(201).json({ user: newUser });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Interal Server Error" });
//   }
// });

module.exports = router;
