const express = require("express");

const authController = require("../controller/auth-controller");
const postsController = require("../controller/post-controller");

const router = express.Router();

router.post("/", authController.isAuth, postsController.addPost);
router.get("/:postId", postsController.getSinglePost);
router.get("/", postsController.getAllPosts);

module.exports = router;
