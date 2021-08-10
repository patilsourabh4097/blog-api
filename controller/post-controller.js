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
    user: userId,
  });

  post = await post.save();
  const postId = post._id;

  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { post: postId } }
  );
  res.status(200).json({
    success: "Post Added",
  });
};

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find();
  if (posts.length === 0) {
    return res.status(404).json({
      message: "No posts found.",
    });
  }

  return res.status(200).json({ posts });
};

exports.getSinglePost = async (req, res) => {
  const { postId } = req.params;

  const isValid = validation.isValidObjectId(postId);
  if (!isValid) {
    res.status(404).json({
      err: "Invalid id",
    });
    return;
  }

  const post = await Post.findById(postId)
    .populate("user", "userName")
    .populate({
      path: "Comment",
      populate: {
        path: "User",
        select: "userName",
      },
    });

  res.status(200).json({
    success: "Success",
    data: post,
  });
};
