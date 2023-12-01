const express = require("express");
const app = express();
const cors = require("cors");

// Configuarations
app.use(cors());
app.use(express.json());
require("dotenv").config();
const PORT = 4000 || process.env.PORT;

// Accessing the files/routers.
const authentication = require("./routes/authentication");

app.use("/authentication", authentication);

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`App is running on ${PORT}`);
  } else {
    console.error(err);
  }
});
