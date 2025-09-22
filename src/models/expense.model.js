const pool = require("../config/conexion");

//Crear gasto

const createExpense = async (amount, userId, category, description) => {
  const insert =
    "INSERT INTO expense (amount, userId, categoryId,description) VALUES (?,?,?,?)";

  const [result] = await pool.query(insert, [
    amount,
    userId,
    category,
    description,
  ]);
  return result;
};

//Editar gasto
const editExpense = async (id, amount, category, description) => {
  const update =
    "UPDATE expense SET amount = ?, categoryId = ?, description = ? WHERE id = ?";

  const [result] = await pool.query(update, [
    amount,
    category,
    description,
    id,
  ]);
  return result;
};

//Eliminar gasto
const deleteExpense = async (id) => {
  const del = "DELETE FROM expense WHERE id = ?";
  const [result] = await pool.query(del, [id]);
  return result;
};

//Listar gastos por usuario en orden descendente por fecha
const listExpensesByUser = async (userId) => {
  const select = "SELECT * FROM expense WHERE userId = ? ORDER BY date DESC";
  const [result] = await pool.query(select, [userId]);
  return result;
}

module.exports = {
  createExpense,
  editExpense,
  deleteExpense,
  listExpensesByUser
};
