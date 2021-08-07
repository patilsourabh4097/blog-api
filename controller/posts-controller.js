const comment = require("../models/Comment");
const Posts = require("../models/Posts");
const User = require("../models/User");
const validation = require("./validation");

exports.addPost = async (req, res) => {
  const {title, desc} = req.body
  const userId = req.user._id
  let newPost = new Posts({
    title: title,
    desc: desc,
    userId: userId,
  });

  let post = await newPost.save();
  postId = post._id;

  const currUser = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { posts: postId } }
  );
  res.json({
    success: "Post Added",
  });
};

exports.getUserPost = async (req, res) => {
  const name = req.params.id
  const currUser = await User.findOne({ userName: name }).populate(
    "posts"
  );
  if (!currUser) {
    res.json({
      err: "User dosent exist",
    });
    return;
  }
  if (currUser.posts.length === 0) {
    res.json({ msg: "this user has made no posts" });
    return;
  }
  res.json({
    success: "Success",
    data: currUser.posts,
  });
};

exports.getPost = async (req, res) => {
  const page = req.params.page;

  if (isNaN(page)) {
    res.json({
      err: "Not a page no",
    });
    return;
  }
  page = parseInt(page);

  const currPosts = await Posts.find()
    .sort({ date: -1 })
    .limit(10)
    .skip(10 * page)
    .populate("userid", "userName");
  res.json({
    success: "Success",
    data: currPosts,
  });
};

exports.getSinglePost = async (req, res) => {
  const id = req.params.id;

  const isValid = validation.isValidObjectId(id);
  if (!isValid) {
    res.json({
      err: "Invalid id",
    });
    return;
  }

  let currPost = Posts.findById(id).populate("userid", "userName");
  currPost.populate({
    path: "comments",
    populate: {
      path: "user",
      select: "userName",
    },
  });
  currPost = await currPost;

  res.json({
    success: "Success",
    data: currPost,
  });
};
