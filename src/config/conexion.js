const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASS_DB,
  port: process.env.PORT_DB,
  database: process.env.NAME_DB,
});

pool
  .getConnection()
  .then((connection) => {
    console.log("Conexion a la BD exitosa");
    connection.release();
  })
  .catch((error) => {
    console.error("Error al conectar a la BD:", error.message);
  });

module.exports = pool;
