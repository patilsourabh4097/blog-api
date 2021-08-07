const User = require("../models/User");

exports.getCurrentUser = async (req, res) => {
  const username = req.user.userName
  const userId = req.user._id
  let currUser = {
    success: "Success",
    data: {
      username: username,
      id: userId,
    }
  };
  res.json(currUser);
};

exports.getUser = async (req, res) => {
  const name = req.params.name;
  const currUser = await User.findOne({ userName: name });

  if (!currUser) {
    res.json({
      err: "user dosent exist",
    });
    return;
  }

  const resUser = {
    username: currUser.userName,
    posts: currUser.posts,
  };
  res.json(resUser);
};
