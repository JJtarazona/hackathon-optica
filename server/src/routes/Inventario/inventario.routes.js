const { Router } = require("express");
const {
  crearProducto,
  obtenerInventario,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
} = require("../../controllers/Inventario/inventarioController");

const inventarioRouter = Router();

inventarioRouter.post("/", crearProducto);
inventarioRouter.get("/por-optica/:opticaId", obtenerInventario);
inventarioRouter.get("/:id", obtenerProductoPorId);
inventarioRouter.put("/:id", actualizarProducto);
inventarioRouter.delete("/:id", eliminarProducto);

module.exports = inventarioRouter;
