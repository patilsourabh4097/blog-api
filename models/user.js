const mongoose = require("mongoose");

const User = new mongoose.Schema({
  userName: String,
  password: String,
  post: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

module.exports = mongoose.model("User", User);
