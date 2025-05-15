const { Router } = require("express");
const {
  crearOptica,
  obtenerOpticas,
  obtenerOpticaPorId,
  actualizarOptica,
  eliminarOptica,
  validarOptica,
} = require("../../controllers/Optica/opticaController");
const opticaRouter = Router();

opticaRouter.post("/", crearOptica);
opticaRouter.get("/", obtenerOpticas);
opticaRouter.get("/:id", obtenerOpticaPorId);
opticaRouter.put("/:id", actualizarOptica);
opticaRouter.get("/validar/:id", validarOptica);
opticaRouter.delete("/:id", eliminarOptica);

module.exports = opticaRouter;
