const express = require("express");

const authController = require("../controller/auth-controller");

const router = express.Router();
router.post("/log-in", authController.login);
router.post("/sign-up", authController.signUp);

module.exports = router;
