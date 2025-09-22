const jwt = require("jsonwebtoken");

const createToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return false; 
  }
};

module.exports = { createToken, verifyToken };


