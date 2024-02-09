const express = require("express");
const router = express.Router();
const { getUsers } = require("../db/queries/gets/getUsers");
const { check, validationResult } = require("express-validator");
const db = require("../db/queries/gets/getUsers");

router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    // console.log(users);
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { user } = req.body;

    // Check if the user exists in the database based on the 'sub' field
    const existingUser = await getUsers().where({ sub_ID: user.sub }).first();

    if (existingUser) {
      console.log("Existing user found:", existingUser);
      // If the user exists, send the existing user details to the frontend
      return res.status(200).json({ user_ID: existingUser.id });
    } else {
      console.log("Creating a new user:", user.sub);
      // If the user doesn't exist, create a new user in the database
      const [newUserID] = await db("users").insert({ sub_ID: user.sub });

      // Fetch the newly created user from the database
      const newUser = await db("users").where("id", newUserID).first();

      // Send the new user details to the frontend
      req.session.userID = newUserID;
      console.log("New user created:", newUser);
      return res.status(201).json({ user: newUser });
    }
  } catch (error) {
    console.error("Error processing user request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
