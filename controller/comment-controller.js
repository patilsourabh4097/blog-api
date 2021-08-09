const Comment = require("../models/comment");
const Post = require("../models/post");
const validation = require("../validators/validation");

exports.addComment = async (req, res) => {
  const { postId } = req.params;
  const { description } = req.body;
  const user = req.user._id;
  const isValid = validation.isValidObjectId(postId);
  if (!isValid) {
    res.json({
      err: "Invalid Id",
    });
    return;
  }

  const comment = new Comment({
    description,
    user,
    post: postId,
  });

  const newComment = await comment.save();

  const post = await Post.findByIdAndUpdate(postId, {
    $push: { comments: newComment._id },
  });

  res.json({
    success: "Comment added",
  });
};
