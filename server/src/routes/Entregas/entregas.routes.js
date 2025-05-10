const { Router } = require("express");
const {
  getEntregasByPedido,
  createEntrega,
  getAllEntregas,
  getEntregaById,
  updateEntrega,
  deleteEntrega,
} = require("../../controllers/Entregas/entregasControllers");
const entregasRouter = Router();

entregasRouter.post("/", createEntrega);
entregasRouter.get("/", getAllEntregas);
entregasRouter.put("/:id", updateEntrega);
entregasRouter.get("/:id", getEntregaById);
entregasRouter.delete("/:id", deleteEntrega);
entregasRouter.get("/por-pedido/:pedidoId", getEntregasByPedido);

module.exports = entregasRouter;
