const Comment = require("../models/Comment");
const Posts = require("../models/Posts");
const validation = require("./validation");

exports.addComment = async (req, res) => {
  const id = req.params.postId;
  const isValid = validation.isValidObjectId(id);
  if (!isValid) {
    res.json({
      err: "Invalid Id",
    });
    return;
  }
  let newComment = new Comment({
    desc: req.body.desc,
    user: req.user._id,
  });

  newComment = await newComment.save();

  let currPost = await Posts.findByIdAndUpdate(id, {
    $push: { comments: newComment._id },
  });

  res.json({
    success: "Comment added",
  });
};
