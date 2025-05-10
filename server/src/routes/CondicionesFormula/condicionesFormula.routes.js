const { Router } = require("express");
const {
  obtenerCondicionesFormula,
  crearCondicionFormula,
  actualizarCondicionFormula,
  eliminarCondicionFormula,
  obtenerCondicionPorId,
} = require("../../controllers/CondicionesFormula/condicionesFormulaController");
const condicionesFormulaRouter = Router();

condicionesFormulaRouter.post("/", crearCondicionFormula);
condicionesFormulaRouter.get("/", obtenerCondicionesFormula);
condicionesFormulaRouter.get("/:id", obtenerCondicionPorId);
condicionesFormulaRouter.put("/:id", actualizarCondicionFormula);
condicionesFormulaRouter.delete("/:id", eliminarCondicionFormula);

module.exports = condicionesFormulaRouter;
