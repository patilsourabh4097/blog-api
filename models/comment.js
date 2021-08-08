const mongoose = require("mongoose");

let Comment = new mongoose.Schema({
  description: String,
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  posts: { type: mongoose.Schema.Types.ObjectId, ref: "Posts" },
});

module.exports = mongoose.model("Comment", Comment);
