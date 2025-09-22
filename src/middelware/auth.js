const jwt = require("jsonwebtoken");
const { verifyToken } = require("../utils/jwt");

const checkToken = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: "No se proporcionó token de autenticación" });
        }

        const token = req.headers.authorization.split(" ")[1];
        const result = verifyToken(token);
        if (!result) {
            return res.status(401).json({ error: "Token de autenticación inválido" });
        }

        req.user = result;
        next();
    } catch (error) {
        console.error("Error al verificar token:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = { checkToken };
