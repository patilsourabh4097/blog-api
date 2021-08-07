const authController = require("../controller/auth-controller");
const router = require("express").Router();

router.post("/log-in", authController.login);
router.post("/sign-up", authController.signUp);

module.exports = router;
