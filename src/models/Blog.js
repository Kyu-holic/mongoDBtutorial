const { Schema, model, Types } = require("mongoose");

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    islive: { type: Boolean, required: true, default: false },
    //   ref:"user"의 user는 User.js에서 user를 설정해주었기 때문. 같은 값으로 해야한다
    user: { type: Types.ObjectId, required: true, ref: "user" },
  },
  { timestamps: true }
);

const Blog = model("blog", BlogSchema);
module.exports = { Blog };
