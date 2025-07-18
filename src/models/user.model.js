const e = require("express");
const pool = require("../config/conexion");

//Crear usuario

const createUser = async (name, email, password) => {
  const insert = "INSERT INTO user (name,email, password) VALUES (?,?,?)";

  const [result] = await pool.query(insert, [name, email, password]);
  return result;
};

const selectByEmail = async (email) => {
  const select = "SELECT * FROM user WHERE email = ?";
  const [result] = await pool.query(select, [email]);
  return result[0];
};



module.exports = { createUser, selectByEmail };
