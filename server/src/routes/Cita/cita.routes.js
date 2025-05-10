const { Router } = require("express");
const {
  crearCita,
  obtenerCitas,
  obtenerCitaPorId,
  actualizarCita,
  eliminarCita,
} = require("../../controllers/Cita/citaController");
const citaRouter = Router();

citaRouter.post("/", crearCita);
citaRouter.get("/", obtenerCitas);
citaRouter.get("/:id", obtenerCitaPorId);
citaRouter.put("/:id", actualizarCita);
citaRouter.delete("/:id", eliminarCita);

module.exports = citaRouter;
