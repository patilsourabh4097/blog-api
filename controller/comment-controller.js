const Comment = require("../models/Comment");
const Posts = require("../models/Posts");
const validation = require("./validation");

exports.addComment = async (req, res) => {
  const postId = req.params.postId;
  const isValid = validation.isValidObjectId(postId);
  if (!isValid) {
    res.json({
      err: "Invalid Id",
    });
    return;
  }
  const description = req.body.desc;
  const userId = req.user._id;
  let newComment = new Comment({
    desc: description,
    user: userId,
    post: postId
  });

  newComment = await newComment.save();

  const currPost = await Posts.findByIdAndUpdate(postId, {
    $push: { comments: newComment._id },
  });

  res.json({
    success: "Comment added",
  });
};
