const { JsonWebTokenError } = require("jsonwebtoken");

const userModel = require("../models/user.model");

const bcrypt = require("bcrypt");

const { createToken } = require("../utils/jwt");

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

//login de usuario
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son requeridos" });
    }

    // Buscar usuario por email
    const user = await userModel.selectByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Email no corresponde a ningun usuario." });
    }

    // Verificar contraseña
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "La contraseña es incorrecta." });
    }

    // Generar token JWT
    const data = { id: user.id, email: user.email, name: user.name };
    const token = createToken(data);

    // Responder con el token y datos del usuario

    res.status(200).json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

//get user profile

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.selectById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error("Error al obtener perfil de usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
