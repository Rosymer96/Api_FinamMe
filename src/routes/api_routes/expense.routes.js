const router = require("express").Router();
const auth = require("../../middelware/auth");

const expenseControllers = require("../../controllers/expense.controllers");

router.post("/add", auth.checkToken, expenseControllers.addExpense);
module.exports = router;
