const { Router } = require("express");

const clienteRouter = require("./Cliente/cliente.routes");
const opticaRouter = require("./Optica/optica.routes");
const formulaRouter = require("./Formula/formula.routes");
const tratamientoRouter = require("./Tratamiento/tratamientos.routes");
const condicionesFormulaRouter = require("./CondicionesFormula/condicionesFormula.routes");
const citaRouter = require("./Cita/cita.routes");
const inventarioRouter = require("./Inventario/inventario.routes");
const proveedorRouter = require("./Proveedor/proveedor.routes");
const pedidoRouter = require("./Pedido/pedido.routes");

const routes = Router();

routes.use("/cliente", clienteRouter);
routes.use("/optica", opticaRouter);
routes.use("/formula", formulaRouter);
routes.use("/tratamiento", tratamientoRouter);
routes.use("/condicionesformula", condicionesFormulaRouter);
routes.use("/cita", citaRouter);
routes.use("/inventario", inventarioRouter);
routes.use("/proveedor", proveedorRouter);
routes.use("/pedido", pedidoRouter);

module.exports = routes;
