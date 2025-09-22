const router = require("express").Router();
const auth = require("../../middelware/auth");
const userControllers = require("../../controllers/user.controllers");

router.post("/register", userControllers.registerUser);
router.post("/login", userControllers.loginUser);
router.get("/profile", auth.checkToken, userControllers.getUserProfile);

module.exports = router;