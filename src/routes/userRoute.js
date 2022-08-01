const { Router } = require("express");
const userRouter = Router();
const { User } = require("../models");
const mongoose = require("mongoose");

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    return res.send({ users });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});

userRouter.get("/:userId", async (req, res) => {
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

userRouter.post("/", async (req, res) => {
  try {
    let { username, name } = req.body;
    if (!username) return res.status(400).send({ err: "username is required" });
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

userRouter.delete("/:userId", async (req, res) => {
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

userRouter.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId))
      return res.status(400).send({ err: "invalid userId" });
    const { age, name } = req.body;
    if (!age && !name)
      return res.status(400).send({ err: "age or name is required" });
    if (age && typeof age !== "number")
      return res.status(400).send({ err: "age must be a number" });
    if (name && typeof name.first !== "string" && typeof name.last !== "string")
      return res.status(400).send({ err: "name must be a string" });
    // const user = await User.findByIdAndUpdate(
    //   // 첫번째 인자는 필터링 하는 조건 / 두번재 인자는 바꿀 것 / 세번째는 업데이트 했을 때 바로 보여주게 하는 조건
    //   userId,
    //   { $set: { age }, $set: {name} },
    //   { new: true }
    // );

    // 위와 같은 방법을 하면 name은 required로 User.js에서 되어 있는데, last 혹은 first name을 안 넣어줘도 업데이트가 됨.
    // 그 이유는 수업에 나와있음
    // 이를 해결해 주기 위해 아래 방법으로
    let user = await User.findById(userId);
    console.log({ userBeforeEdit: user });
    if (age) user.age = age;
    if (name) user.name = name;
    console.log({ userAfterEdit: user });
    await user.save();
    return res.send({ user });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: err.message });
  }
});

module.exports = { userRouter };
