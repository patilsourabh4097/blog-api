const User = require("../models/user");

exports.getCurrentUser = async (req, res) => {
  const { userName } = req.user;
  const userId = req.user._id;
  const user = {
    success: "Success",
    data: {
      username: userName,
      id: userId,
    },
  };
  res.status(200).json(user);
};

exports.getUser = async (req, res) => {
  const { name } = req.params;
  const user = await User.findOne({ userName: name }).populate("post");

  if (!user) {
    res.status(404).json({
      err: "user dosent exist",
    });
    return;
  }

  const result = {
    username: user.userName,
    posts: user.posts,
  };
  res.status(200).json(result);
};
