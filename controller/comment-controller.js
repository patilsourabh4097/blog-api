const Comment = require("../models/comment");
const Posts = require("../models/posts");
const validation = require("./validation");

exports.addComment = async (req, res) => {
  const { postId } = req.params;
  const isValid = validation.isValidObjectId(postId);
  if (!isValid) {
    res.json({
      err: "Invalid Id",
    });
    return;
  }
  const { description } = req.body;
  const userId = req.user._id;
  const comment = new Comment({
    description,
    userId,
    posts: postId,
  });

  const newComment = await comment.save();

  const post = await Posts.findByIdAndUpdate(postId, {
    $push: { comments: newComment._id },
  });

  res.json({
    success: "Comment added",
  });
};
