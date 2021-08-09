const Comment = require("../models/comment");
const Post = require("../models/post");
const User = require("../models/user");

const validation = require("../validators/validation");

exports.addPost = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user._id;
  let post = new Post({
    title,
    description,
    user:userId,
  });

  let post = await post.save();
  const postId = post._id;

  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { post: postId } }
  );
  res.json({
    success: "Post Added",
  });
};

exports.getUserPost = async (req, res) => {
  const { name } = req.params;
  const user = await User.findOne({ userName: name }).populate("post");
  if (!user) {
    res.json({
      err: "User dosent exist",
    });
    return;
  }
  if (user.posts.length === 0) {
    res.json({ msg: "this user has made no posts" });
    return;
  }
  res.json({
    success: "Success",
    data: user.post,
  });
};

exports.getSinglePost = async (req, res) => {
  const { postId } = req.params;

  const isValid = validation.isValidObjectId(postId);
  if (!isValid) {
    res.json({
      err: "Invalid id",
    });
    return;
  }

  let post = await Post.findById(postId).populate("user", "userName");
  post.populate({
    path: "Comment",
    populate: {
      path: "User",
      select: "userName",
    },
  });

  res.json({
    success: "Success",
    data: post,
  });
};
