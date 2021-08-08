const express = require("express");

const authController = require("../controller/auth-controller");
const postsController = require("../controller/posts-controller");

const router = express.Router();

router.post("/", authController.isAuth, postsController.addPost);
router.get("/:postId", postsController.getSinglePost);
router.get("/user/:name", postsController.getUserPost);

module.exports = router;
