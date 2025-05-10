const { Router } = require("express");
const {
  crearPedido,
  obtenerPedidos,
  obtenerPedidoPorId,
  obtenerPedidosPorOptica,
  actualizarPedido,
  eliminarPedido,
} = require("../../controllers/Pedido/pedido");

const pedidoRouter = Router();

pedidoRouter.post("/", crearPedido);
pedidoRouter.get("/", obtenerPedidos);
pedidoRouter.get("/:id", obtenerPedidoPorId);
pedidoRouter.get("/por-optica/:opticaId", obtenerPedidosPorOptica);
pedidoRouter.put("/:id", actualizarPedido);
pedidoRouter.delete("/:id", eliminarPedido);

module.exports = pedidoRouter;
