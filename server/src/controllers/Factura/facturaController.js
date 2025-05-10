const { Facturas } = require("../../db");
const { Op } = require("sequelize");

// Validación simple de campos requeridos
const validarFactura = (body) => {
  const errores = [];

  if (!body.fechaFactura)
    errores.push("La fecha de la factura es obligatoria.");
  if (!body.total || isNaN(body.total))
    errores.push("El total debe ser un número válido.");
  if (!body.metodoPago) errores.push("El método de pago es obligatorio.");
  if (!body.pedidoId) errores.push("El pedido es obligatorio.");
  if (!body.opticaId) errores.push("La óptica es obligatoria.");
  if (!body.clienteId) errores.push("El cliente es obligatorio.");

  return errores;
};

// Obtener todas las facturas
const getFacturas = async (req, res) => {
  try {
    const facturas = await Facturas.findAll();
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las facturas" });
  }
};

// Obtener una factura por ID
const getFacturaById = async (req, res) => {
  const { id } = req.params;
  try {
    const factura = await Facturas.findByPk(id);
    if (!factura)
      return res.status(404).json({ error: "Factura no encontrada" });
    res.json(factura);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la factura" });
  }
};

// Crear una nueva factura con validación
const createFactura = async (req, res) => {
  const errores = validarFactura(req.body);
  if (errores.length > 0) return res.status(400).json({ errores });

  try {
    const factura = await Facturas.create(req.body);
    res.status(201).json(factura);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error al crear la factura", detalle: error.message });
  }
};

// Actualizar una factura con validación
const updateFactura = async (req, res) => {
  const { id } = req.params;
  try {
    const factura = await Facturas.findByPk(id);
    if (!factura)
      return res.status(404).json({ error: "Factura no encontrada" });

    const errores = validarFactura({ ...factura.dataValues, ...req.body });
    if (errores.length > 0) return res.status(400).json({ errores });

    await factura.update(req.body);
    res.json(factura);
  } catch (error) {
    res.status(400).json({
      error: "Error al actualizar la factura",
      detalle: error.message,
    });
  }
};

// Eliminar una factura
const deleteFactura = async (req, res) => {
  const { id } = req.params;
  try {
    const factura = await Facturas.findByPk(id);
    if (!factura)
      return res.status(404).json({ error: "Factura no encontrada" });
    await factura.destroy();
    res.json({ mensaje: "Factura eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la factura" });
  }
};

// Facturas por óptica
const getFacturasPorOptica = async (req, res) => {
  const { opticaId } = req.params;
  try {
    const facturas = await Facturas.findAll({ where: { opticaId } });
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener facturas por óptica" });
  }
};

// Facturas por cliente
const getFacturasPorCliente = async (req, res) => {
  const { clienteId } = req.params;
  try {
    const facturas = await Facturas.findAll({ where: { clienteId } });
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener facturas por cliente" });
  }
};

// Facturas por pedido
const getFacturasPorPedido = async (req, res) => {
  const { pedidoId } = req.params;
  try {
    const facturas = await Facturas.findAll({ where: { pedidoId } });
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener facturas por pedido" });
  }
};

module.exports = {
  getFacturas,
  getFacturaById,
  createFactura,
  updateFactura,
  deleteFactura,
  getFacturasPorOptica,
  getFacturasPorCliente,
  getFacturasPorPedido,
};
