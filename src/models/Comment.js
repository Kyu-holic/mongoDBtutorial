const mongoose = require("mongoose");
const { Types } = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    user: { type: Types.ObjectId, required: true, ref: "user" },
    blog: { type: Types.ObjectId, required: true, ref: "blog" },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = { Comment };
