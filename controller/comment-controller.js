const Comment = require("../models/comment");
const Post = require("../models/post");

const validation = require("../validators/validation");

exports.addComment = async (req, res) => {
  const { postId } = req.params;
  const { description } = req.body;
  const user = req.user._id;
  const isValid = validation.isValidObjectId(postId);
  if (!isValid) {
    res.status(404).json({
      err: "Invalid Id",
    });
    return;
  }

  let comment = new Comment({
    description,
    user,
    post: postId,
  });

  comment = await comment.save();

  const post = await Post.findByIdAndUpdate(postId, {
    $push: { comments: comment._id },
  });

  res.status(200).json({
    success: "Comment added",
  });
};

exports.getAllComments = async (req, res) => {
  const { postId } = req.params;
  const user = req.user._id;
  const isValid = validation.isValidObjectId(postId);
  if (!isValid) {
    res.status(404).json({
      err: "Invalid Id",
    });
    return;
  }
  const postComments = await Post.findById(postId).populate("comments");
  res.status(200).json({ postComments });
};
