const mongoose = require("mongoose");

let Comment = new mongoose.Schema({
  desc: String,
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Posts" }
});

module.exports = mongoose.model("Comment", Comment);
