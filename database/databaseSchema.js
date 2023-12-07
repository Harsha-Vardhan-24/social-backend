const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const newUserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    posts: {
      type: Array,
    },
    following: {
      type: Array
    },
    followers: {
      type: Array
    },
    admin: Boolean,
  },
  {
    collection: "users",
  }
);

const User = mongoose.model("User", newUserSchema);

const saveNewUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
  const { email, fullName, userName } = userData;
  const newUser = new User({
    fullName,
    userName,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
  } catch (error) {
    console.error(error);
  }
};

const userCheck = async (userEmail) => {
  const check = await User.find({ email: userEmail });
  if (check.length === 0) {
    return false;
  } else if (check) {
    return true;
  }
};

const userLogin = async (userData) => {
  const { email, password } = userData;
  try {
    const selectedUser = await User.findOne({ email: email });
    if (selectedUser) {
      const passwordsMatched = await bcrypt.compare(
        password,
        selectedUser.password
      );
      if (passwordsMatched) {
        // console.log("Correct Password");
        return true;
      } else {
        // console.log("Wrong Password");
        return false;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { saveNewUser, userCheck, userLogin };
