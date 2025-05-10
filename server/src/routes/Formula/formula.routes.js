const { Router } = require("express");
const {
  crearFormula,
  obtenerFormulas,
  obtenerFormulaPorId,
  actualizarFormula,
  eliminarFormula,
} = require("../../controllers/Formula/formulaController");

const formulaRouter = Router();

formulaRouter.post("/", crearFormula);
formulaRouter.get("/", obtenerFormulas);
formulaRouter.get("/:id", obtenerFormulaPorId);
formulaRouter.put("/:id", actualizarFormula);
formulaRouter.delete("/:id", eliminarFormula);

module.exports = formulaRouter;
