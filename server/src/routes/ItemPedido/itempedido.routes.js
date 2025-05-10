const { Router } = require("express");
const {
  createItemPedido,
  getAllItemsPedido,
  getItemPedidoById,
  updateItemPedido,
  deleteItemPedido,
  getItemsByPedidoId,
} = require("../../controllers/ItemsPedido/itemsPedido");

const itemPedidoRouter = Router();

itemPedidoRouter.post("/", createItemPedido);
itemPedidoRouter.get("/", getAllItemsPedido);
itemPedidoRouter.put("/:id", updateItemPedido);
itemPedidoRouter.get("/:id", getItemPedidoById);
itemPedidoRouter.delete("/:id", deleteItemPedido);
itemPedidoRouter.get("/por-pedido/:pedidoId", getItemsByPedidoId);

module.exports = itemPedidoRouter;
