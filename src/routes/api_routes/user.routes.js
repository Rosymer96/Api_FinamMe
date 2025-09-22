const router = require("express").Router();

const userControllers = require("../../controllers/user.controllers");

router.post("/register", userControllers.registerUser);
router.post("/login", userControllers.loginUser);

module.exports = router;
    