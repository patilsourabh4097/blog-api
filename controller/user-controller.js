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
  res.json(user);
};

exports.getUser = async (req, res) => {
  const { name } = req.params;
  const user = await User.findOne({ userName: name });

  if (!user) {
    res.json({
      err: "user dosent exist",
    });
    return;
  }

  const result = {
    username: user.userName,
    posts: user.posts,
  };
  res.json(result);
};
