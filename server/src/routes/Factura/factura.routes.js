const { Router } = require("express");
const {
  getFacturas,
  getFacturaById,
  createFactura,
  updateFactura,
  deleteFactura,
  getFacturasPorOptica,
  getFacturasPorCliente,
  getFacturasPorPedido,
} = require("../../controllers/Factura/facturaController");
const facturaRouter = Router();

facturaRouter.get("/", getFacturas);
facturaRouter.get("/:id", getFacturaById);
facturaRouter.post("/", createFactura);
facturaRouter.put("/:id", updateFactura);
facturaRouter.delete("/:id", deleteFactura);
facturaRouter.get("/por-optica/:opticaId", getFacturasPorOptica);
facturaRouter.get("/por-cliente/:clienteId", getFacturasPorCliente);
facturaRouter.get("/por-pedido/:pedidoId", getFacturasPorPedido);

module.exports = facturaRouter;
