const { JsonWebTokenError } = require("jsonwebtoken");

const userModel = require("../models/user.model");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

//Crear usuario

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if ((!name, !email, !password)) {
      return res
        .status(400)
        .json({ error: "Todos los datos son obligatorios" });
    }

    //Verificar si ya existe un usuarios con este email

    const existedUser = await userModel.selectByEmail(email);
    if (existedUser) {
      return res.status(400).json({
        message: "Ya existe un usuario registrado con este email.",
      });
    }

    hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await userModel.createUser(name, email, hashedPassword);

    res.status(201).json({
        message:"Usuario registrado con exito."
    })
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error interno del servidor al crear usuario" });
  }
};

module.exports = {registerUser};
