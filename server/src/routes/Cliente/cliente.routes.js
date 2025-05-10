const { Router } = require("express");
const {
  crearCliente,
  obtenerClientes,
  obtenerClientePorId,
  actualizarCliente,
  eliminarCliente,
} = require("../../controllers/Clientes/clienteController");
// TODO implementar para la autenticación
// const checkAuth = require("../../middlewares/checkAuth");

const clienteRouter = Router();

// clienteRouter.post("/", checkAuth, crearCliente);
clienteRouter.post("/", crearCliente);
clienteRouter.get("/", obtenerClientes);
clienteRouter.get("/:id", obtenerClientePorId);
clienteRouter.put("/:id", actualizarCliente);
clienteRouter.delete("/:id", eliminarCliente);

module.exports = clienteRouter;
