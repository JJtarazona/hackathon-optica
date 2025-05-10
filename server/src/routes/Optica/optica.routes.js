const { Router } = require("express");
const {
  crearOptica,
  obtenerOpticas,
  obtenerOpticaPorId,
  actualizarOptica,
  eliminarOptica,
} = require("../../controllers/Optica/opticaController");
const opticaRouter = Router();

opticaRouter.post("/", crearOptica);
opticaRouter.get("/", obtenerOpticas);
opticaRouter.get("/:id", obtenerOpticaPorId);
opticaRouter.put("/:id", actualizarOptica);
opticaRouter.delete("/:id", eliminarOptica);

module.exports = opticaRouter;
