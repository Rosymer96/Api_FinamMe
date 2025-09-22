//Controladores de gastos

const expenseModel = require("../models/expense.model");

// Agregar gasto
const addExpense = async (req, res) => {
  try {
    const { amount, category, description } = req.body;
    const expense = await expenseModel.createExpense(
      amount,
      req.user.id,
      category,
      description
    );
    res.status(201).json({ message: "Gasto agregado con exito", expense });
  } catch (error) {
    console.error("Error al agregar gasto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { addExpense };
