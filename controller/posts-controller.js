const Comment = require("../models/comment");
const Posts = require("../models/posts");
const User = require("../models/user");

const validation = require("./validation");

exports.addPost = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user._id;
  let newPost = new Posts({
    title,
    description,
    userId,
  });

  let post = await newPost.save();
  postId = post._id;

  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { posts: postId } }
  );
  res.json({
    success: "Post Added",
  });
};

exports.getUserPost = async (req, res) => {
  const { name } = req.params;
  const user = await User.findOne({ userName: name }).populate("posts");
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
    data: user.posts,
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

  let post = Posts.findById(postId).populate("userid", "userName");
  post.populate({
    path: "Comments",
    populate: {
      path: "User",
      select: "userName",
    },
  });
  post = await post;

  res.json({
    success: "Success",
    data: post,
  });
};
