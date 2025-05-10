const { Router } = require("express");
const {
  crearTratamiento,
  obtenerTratamientos,
  obtenerTratamientoPorId,
  actualizarTratamiento,
  eliminarTratamiento,
} = require("../../controllers/Tratamientos/tratamientosFormulaController");
const tratamientoRouter = Router();

tratamientoRouter.post("/", crearTratamiento);
tratamientoRouter.get("/", obtenerTratamientos);
tratamientoRouter.get("/:id", obtenerTratamientoPorId);
tratamientoRouter.put("/:id", actualizarTratamiento);
tratamientoRouter.delete("/:id", eliminarTratamiento);

module.exports = tratamientoRouter;
