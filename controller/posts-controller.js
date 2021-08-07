const comment = require("../models/Comment");
const Posts = require("../models/Posts");
const User = require("../models/User");
const validation = require("./validation");

exports.addPost = async (req, res) => {
  let newPost = new Posts({
    title: req.body.title,
    desc: req.body.desc,
    userid: req.user._id,
  });

  let post = await newPost.save();
  post = post._id;

  let currUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { posts: post } }
  );
  res.json({
    success: "Post Added",
  });
};

exports.getUserPost = async (req, res) => {
  const currUser = await User.findOne({ userName: req.params.id }).populate(
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
  let page = req.params.page;

  if (isNaN(page)) {
    res.json({
      err: "Not a page no",
    });
    return;
  }
  page = parseInt(page);

  let currPosts = await Posts.find()
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

  let isValid = validation.isValidObjectId(id);
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
