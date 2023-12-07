const express = require("express");
const router = express();
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const User = mongoose.model("User");

router.get("/", (req, res) => {
  const userEmail = req.body;
  console.log(userEmail);
});

router.post("/", async (req, res) => {
  const { postImage, postText, userEmail } = req.body;
  const checkedUser = await User.find({ email: userEmail });
  if (checkedUser) {
    try {
      const newPost = {
        postID: uuidv4(),
        postText: postText,
        postImage: postImage,
      };
      checkedUser[0].posts = checkedUser[0].posts.concat(newPost);
      await checkedUser[0].save();
      res.status(200).json({ response: "Post saved successfully" });
    } catch (error) {
      console.error(error);
    }
  }
});

module.exports = router;
