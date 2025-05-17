const { Router } = require("express");
const {
  crearCita,
  obtenerCitas,
  obtenerCitaPorId,
  actualizarCita,
  eliminarCita,
  getCitasByOpticaId,
} = require("../../controllers/Cita/citaController");
const citaRouter = Router();

citaRouter.post("/", crearCita);
citaRouter.get("/", obtenerCitas);
citaRouter.put("/:id", actualizarCita);
citaRouter.delete("/:id", eliminarCita);
citaRouter.get("/:id", obtenerCitaPorId);
citaRouter.get("/por-optica/:opticaId", getCitasByOpticaId);

module.exports = citaRouter;
