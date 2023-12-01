const mongoose = require("mongoose");

const connectToDB = async () => {
  const databaseConnectionUrl = process.env.MONGODB_CONNECTION_STRING;
  try {
    await mongoose.connect(`${databaseConnectionUrl}/socialDB`);
    console.log("Connected to DB");
  } catch (error) {
    console.error(`${error} can not connect to DB`);
  }
};

module.exports = { connectToDB };
