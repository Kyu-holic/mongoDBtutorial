const express = require("express");
const app = express();
const { userRouter } = require("./routes/userRouter");
const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://khhan1990:hankyu5134@mongodbtutorial.kmtbt.mongodb.net/BlogService?retryWrites=true&w=majority";

const server = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
    app.use(express.json());

    app.use("/user", userRouter);

    app.listen(3000, () => {
      console.log("server listening on port 3000");
    });
  } catch (err) {
    console.log(err);
  }
};

server();
