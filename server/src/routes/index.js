const { Router } = require("express");
const routes = Router();

const citaRouter = require("./Cita/cita.routes");
const opticaRouter = require("./Optica/optica.routes");
const pedidoRouter = require("./Pedido/pedido.routes");
const clienteRouter = require("./Cliente/cliente.routes");
const formulaRouter = require("./Formula/formula.routes");
const facturaRouter = require("./Factura/factura.routes");
const entregasRouter = require("./Entregas/entregas.routes");
const proveedorRouter = require("./Proveedor/proveedor.routes");
const inventarioRouter = require("./Inventario/inventario.routes");
const itemPedidoRouter = require("./ItemPedido/itempedido.routes");
const tratamientoRouter = require("./Tratamiento/tratamientos.routes");
const condicionesFormulaRouter = require("./CondicionesFormula/condicionesFormula.routes");

routes.use("/cita", citaRouter);
routes.use("/optica", opticaRouter);
routes.use("/pedido", pedidoRouter);
routes.use("/cliente", clienteRouter);
routes.use("/factura", facturaRouter);
routes.use("/formula", formulaRouter);
routes.use("/entregas", entregasRouter);
routes.use("/proveedor", proveedorRouter);
routes.use("/inventario", inventarioRouter);
routes.use("/itemsPedido", itemPedidoRouter);
routes.use("/tratamiento", tratamientoRouter);
routes.use("/condicionesformula", condicionesFormulaRouter);

module.exports = routes;
