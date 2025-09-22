const router = require("express").Router();
const auth = require("../../middelware/auth");

const expenseControllers = require("../../controllers/expense.controllers");

router.post("/add", auth.checkToken, expenseControllers.addExpense);
router.put("/update/:id", auth.checkToken, expenseControllers.editExpense);
router.delete("/delete/:id", auth.checkToken, expenseControllers.deleteExpense);
router.get("/list", auth.checkToken, expenseControllers.listExpensesByUser);

module.exports = router;
