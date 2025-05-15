const { Router } = require("express");
const {
  crearFormula,
  obtenerFormulas,
  obtenerFormulaPorId,
  actualizarFormula,
  eliminarFormula,
  obtenerFormulaPorOptica,
} = require("../../controllers/Formula/formulaController");

const formulaRouter = Router();

formulaRouter.post("/", crearFormula);
formulaRouter.get("/", obtenerFormulas);
formulaRouter.get("/:id", obtenerFormulaPorId);
formulaRouter.put("/:id", actualizarFormula);
formulaRouter.delete("/:id", eliminarFormula);
formulaRouter.get("/por-optica/:opticaId", obtenerFormulaPorOptica);

module.exports = formulaRouter;
