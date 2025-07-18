const pool = require("../config/conexion");

//Crear gasto

const createExpense = async (amount, userId, category, description) => {
  const insert =
    "INSERT INTO expense (amount, userId, category,description) VALUES (?,?,?,?)";

  const [result] = await pool.query(insert, [
    amount,
    userId,
    category,
    description,
  ]);
  return result;
};

module.exports = {
  createExpense,
};
