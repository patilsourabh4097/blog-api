const mongoose = require("mongoose");

const Comment = new mongoose.Schema({
  description: String,
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
});

module.exports = mongoose.model("Comment", Comment);
