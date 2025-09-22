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

//editar gasto

const editExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expenseExist = await expenseModel.selectById(id);
    if (!expenseExist) {
      return res.status(404).json({ error: "Gasto no encontrado" });
    }

    const { amount, category, description } = req.body;
    if (!amount || !category || !description) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }
    const expense = await expenseModel.editExpense(
      id,
      amount,
      category,
      description
    );
    res.status(200).json({ message: "Gasto editado con exito", expense });
  } catch (error) {
    console.error("Error al editar gasto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

//Eliminar gasto
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await expenseModel.deleteExpense(id);
    res.status(200).json({ message: "Gasto eliminado con exito" });
  } catch (error) {
    console.error("Error al eliminar gasto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

//Listar gastos por usuario
const listExpensesByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await expenseModel.listExpensesByUser(userId);
    res.status(200).json({ expenses });
  } catch (error) {
    console.error("Error al obtener gastos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
module.exports = { addExpense, editExpense, deleteExpense, listExpensesByUser };
