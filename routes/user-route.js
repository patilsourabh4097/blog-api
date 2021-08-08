const express = require("express");

const authController = require("../controller/auth-controller");
const userController = require("../controller/user-controller");

const router = express.Router();

router.get("/:name", userController.getUser);
router.get("/", authController.isAuth, userController.getCurrentUser);

module.exports = router;
