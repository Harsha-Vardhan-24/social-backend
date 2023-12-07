const express = require("express");
const router = express();
const { connectToDB } = require("../utils/utils");
const {
  saveNewUser,
  userCheck,
  userLogin,
} = require("../database/databaseSchema");

router.get("/", (req, res) => {
  res.send("This is a user authentication page");
});

router.post("/login", async (req, res) => {
  const userData = req.body;
  try {
    const check = await userCheck(userData.email);
    if (!check) {
      res.json("Email does not exists, Considering signing up.");
    } else {
      const correctPassword = await userLogin(userData);
      console.log(correctPassword);
      if (!correctPassword) {
        // res.status(401).json("Incorrect Password");
        res.json("Sorry, your password is incorrect");
      } else {
        console.log(correctPassword);
        // res.status(200).json("Login successful");
        res.json({
          userEmail: userData.email,
          message: "User logged in successful",
        });
      }
    }
  } catch (error) {
    res.status(500).json("Error checking user in DB");
    console.error(error);
  }
});

router.post("/signup", async (req, res) => {
  const userData = req.body;
  try {
    const check = await userCheck(userData.email);
    if (!check) {
      saveNewUser(userData);
      res.json({
        userEmail: userData.email,
        message: "User successfully saved to DB",
      });
    } else {
      res.json("User already exists in DB");
    }
  } catch (error) {
    res.json("User could not be saved to DB");
    console.error(error);
  }
});

module.exports = router;
