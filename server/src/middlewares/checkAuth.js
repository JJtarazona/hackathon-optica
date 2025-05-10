// src/middlewares/checkAuth.js
const { Clerk } = require("@clerk/clerk-sdk-node");

const checkAuth = async (req, res, next) => {
  try {
    // Verificar el token de sesión de Clerk
    const sessionToken = req.headers.authorization?.split(" ")[1]; // Obtener token del header Authorization
    if (!sessionToken) {
      return res
        .status(401)
        .json({ error: "Token de sesión no proporcionado" });
    }

    // Verificar la sesión con Clerk
    const { userId } = await Clerk.verifySession(sessionToken);

    // Obtener información del usuario
    const user = await Clerk.users.getUser(userId);
    if (!user) {
      return res.status(401).json({ error: "Usuario no autorizado" });
    }

    // Agregar el usuario autenticado al objeto req
    req.user = user;
    next(); // Continuar con la ejecución del siguiente middleware o ruta
  } catch (error) {
    return res.status(401).json({ error: "No se pudo verificar el usuario" });
  }
};

module.exports = checkAuth;
