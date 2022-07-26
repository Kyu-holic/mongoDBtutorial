const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { User } = require("./models/User");

const MONGO_URI =
  "mongodb+srv://khhan1990:hankyu5134@mongodbtutorial.kmtbt.mongodb.net/BlogService?retryWrites=true&w=majority";

const server = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
    app.use(express.json());

    app.get("/user", async (req, res) => {
      try {
        const users = await User.find({});
        return res.send({ users });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
      }
    });

    app.get("/user/:userId", async (req, res) => {
      try {
        const { userId } = req.params;
        if (!mongoose.isValidObjectId(userId))
          return res.status(400).send({ err: "invalid userId" });
        const user = await User.findOne({ _id: userId });
        return res.send({ user });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
      }
    });

    app.post("/user", async (req, res) => {
      try {
        let { username, name } = req.body;
        if (!username)
          return res.status(400).send({ err: "username is required" });
        if (!name || !name.first || !name.last)
          return res
            .status(400)
            .send({ err: "Both first and last names are required" });
        const user = new User(req.body);
        await user.save();
        return res.send({ user });
      } catch (err) {
        console.log(err);
        return res.status(400).send({ err: err.message });
      }
    });

    app.delete("/user/:userId", async (req, res) => {
      try {
        const { userId } = req.params;
        if (!mongoose.isValidObjectId(userId))
          return res.status(400).send({ err: "invalid userId" });
        const user = await User.findOneAndDelete({ _id: userId });
        return res.send({ user });
      } catch (err) {
        console.log(err);
        return res.status(400).send({ err: err.message });
      }
    });

    app.put("/user/:userId", async (req, res) => {
      try {
        const { userId } = req.params;
        if (!mongoose.isValidObjectId(userId))
          return res.status(400).send({ err: "invalid userId" });
        const { age } = req.body;
        // 아래는 age가 기입되지 않았을 때 내보내는 오류
        if (!age) return res.status(400).send({ err: "age is required" });
        // 아래는 age가 숫자가 아닐 때 내보내는 오류
        if (typeof age !== "number")
          return res.status(400).send({ err: "age must be a number" });
        const user = await User.findByIdAndUpdate(
          // 첫번째 인자는 필터링 하는 조건 / 두번재 인자는 바꿀 것 / 세번째는 업데이트 했을 때 바로 보여주게 하는 조건
          userId,
          { $set: { age } },
          { new: true }
        );
        return res.send({ user });
      } catch (err) {
        console.log(err);
        return res.status(400).send({ err: err.message });
      }
    });

    app.listen(3000, () => {
      console.log("server listening on port 3000");
    });
  } catch (err) {
    console.log(err);
  }
};

server();
