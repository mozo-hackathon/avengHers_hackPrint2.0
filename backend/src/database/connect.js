require("dotenv").config();
const mongoose = require("mongoose");

const mongoUri = process.env.MONGOURL;

const connectDB = () => {
  mongoose
    .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
      console.log("MongoDB Connected");
    });
};
module.exports = connectDB;
