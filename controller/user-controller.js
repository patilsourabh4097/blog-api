const User = require("../models/User");

exports.getCurrentUser = async (req, res) => {
  let currUser = {
    success: "Success",
    data: {
      username: req.user.userName,
      id: req.user._id,
    }
  };
  res.json(currUser);
};

exports.getUser = async (req, res) => {
  const name = req.params.name;
  let currUser = await User.findOne({ userName: name });

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
