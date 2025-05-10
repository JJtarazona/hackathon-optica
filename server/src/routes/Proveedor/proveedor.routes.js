const { Router } = require("express");
const proveedorRouter = Router();
const {
  crearProveedor,
  obtenerProveedores,
  obtenerProveedorPorId,
  actualizarProveedor,
  eliminarProveedor,
} = require("../../controllers/Proveedor/proveedorControllador");

proveedorRouter.post("/", crearProveedor);
proveedorRouter.get("/por-optica/:opticaId", obtenerProveedores);
proveedorRouter.get("/:id", obtenerProveedorPorId);
proveedorRouter.put("/:id", actualizarProveedor);
proveedorRouter.delete("/:id", eliminarProveedor);

module.exports = proveedorRouter;
