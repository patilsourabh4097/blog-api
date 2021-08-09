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

  post = await post.save();
  const postId = post._id;

  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { post: postId } }
  );
  res.json({
    success: "Post Added",
  });
};

exports.getAllPosts = async (req,res)=>{
  const posts = await Post.find()
  if (posts.length === 0) {
    return res.status(400).json({
      message: "No posts found.",
    });
  }

  return res.json({posts});
}

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
  post = post.populate({
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
