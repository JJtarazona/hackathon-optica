const { Router } = require("express");
const {
  crearCliente,
  obtenerClientes,
  obtenerClientePorId,
  actualizarCliente,
  eliminarCliente,
  obtenerClientesPorOptica,
  numeroCliente,
} = require("../../controllers/Clientes/clienteController");
// TODO implementar para la autenticación
// const checkAuth = require("../../middlewares/checkAuth");

const clienteRouter = Router();

// clienteRouter.post("/", checkAuth, crearCliente);
clienteRouter.post("/", crearCliente);
clienteRouter.get("/", obtenerClientes);
clienteRouter.put("/:id", actualizarCliente);
clienteRouter.delete("/:id", eliminarCliente);
clienteRouter.get("/:id", obtenerClientePorId);
clienteRouter.get("/por-optica/:opticaId", obtenerClientesPorOptica);

//Para la grafica
clienteRouter.get("/numero/:opticaId", numeroCliente);

module.exports = clienteRouter;
