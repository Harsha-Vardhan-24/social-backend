const express = require("express");
const router = express();
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.post("/", async (req, res) => {
  const userEmail = req.body.email;
  const userData = await User.findOne({ email: userEmail });
  if (userData.following.length === 0) {
    res.json({ message: "There are no followers for this user" });
  } else {
    // Here we need to send the posts data of the followers to the client and render it.
    console.log(userData.following);
  }
});

module.exports = router;
