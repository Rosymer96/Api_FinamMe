const router = require("express").Router();

router.use("/expense", require("./api_routes/expense.routes"));
router.use("/user", require("./api_routes/user.routes"));

module.exports = router;
