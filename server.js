const express = require("express");
const app = express();
const cors = require("cors");

// Configuarations
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({
    limit: "10mb",
    extended: true,
    parameterLimit: 10000,
  })
);
require("dotenv").config();
const PORT = 4000 || process.env.PORT;

// Database Connection
const { connectToDB } = require("./utils/utils");
connectToDB();

// Accessing the files/routers.
const authentication = require("./routes/authentication");
const fileUpload = require("./routes/fileUpload");
const getPosts = require("./routes/getPosts");

app.use("/authentication", authentication);
app.use("/file-upload", fileUpload);
app.use("/get-posts", getPosts);

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`App is running on ${PORT}`);
  } else {
    console.error(err);
  }
});
