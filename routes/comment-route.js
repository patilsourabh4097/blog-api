const express = require("express");

const auth = require("../controller/auth-controller");
const commentController = require("../controller/comment-controller");

const router = express.Router();

router.post("/:postId/comment", auth.isAuth, commentController.addComment);

module.exports = router;
