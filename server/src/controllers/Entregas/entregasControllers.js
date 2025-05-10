const { Entregas, Pedidos } = require("../../db");

// Validador simple de datos
const validateEntregaData = (data) => {
  const errors = [];
  if (!data.fechaEntrega) errors.push("La fecha de entrega es obligatoria.");
  if (!data.entregadoPor) errors.push("El campo entregadoPor es obligatorio.");
  if (!data.estado) errors.push("El estado es obligatorio.");
  if (!data.pedidoId) errors.push("El pedidoId es obligatorio.");
  return errors;
};

// Crear entrega
const createEntrega = async (req, res) => {
  try {
    const errors = validateEntregaData(req.body);
    if (errors.length > 0) return res.status(400).json({ errors });

    const pedido = await Pedidos.findByPk(req.body.pedidoId);
    if (!pedido) return res.status(404).json({ error: "Pedido no encontrado" });

    const nuevaEntrega = await Entregas.create(req.body);
    res.status(201).json(nuevaEntrega);
  } catch (error) {
    console.error("Error al crear entrega:", error);
    res.status(500).json({ error: "Error al crear la entrega" });
  }
};

// Obtener todas las entregas
const getAllEntregas = async (req, res) => {
  try {
    const entregas = await Entregas.findAll();
    res.status(200).json(entregas);
  } catch (error) {
    console.error("Error al obtener entregas:", error);
    res.status(500).json({ error: "Error al obtener entregas" });
  }
};

// Obtener entrega por ID
const getEntregaById = async (req, res) => {
  try {
    const entrega = await Entregas.findByPk(req.params.id);
    if (!entrega)
      return res.status(404).json({ error: "Entrega no encontrada" });
    res.status(200).json(entrega);
  } catch (error) {
    console.error("Error al obtener entrega:", error);
    res.status(500).json({ error: "Error al obtener la entrega" });
  }
};

// Actualizar entrega
const updateEntrega = async (req, res) => {
  try {
    const entrega = await Entregas.findByPk(req.params.id);
    if (!entrega)
      return res.status(404).json({ error: "Entrega no encontrada" });

    await entrega.update(req.body);
    res.status(200).json(entrega);
  } catch (error) {
    console.error("Error al actualizar entrega:", error);
    res.status(500).json({ error: "Error al actualizar la entrega" });
  }
};

// Eliminar entrega
const deleteEntrega = async (req, res) => {
  try {
    const entrega = await Entregas.findByPk(req.params.id);
    if (!entrega)
      return res.status(404).json({ error: "Entrega no encontrada" });

    await entrega.destroy();
    res.status(200).json({ message: "Entrega eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar entrega:", error);
    res.status(500).json({ error: "Error al eliminar la entrega" });
  }
};

// Obtener entregas por pedidoId
const getEntregasByPedido = async (req, res) => {
  const { pedidoId } = req.params;
  try {
    const entregas = await Entregas.findAll({ where: { pedidoId } });
    if (!entregas || entregas.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron entregas para este pedido" });
    }
    res.status(200).json(entregas);
  } catch (error) {
    console.error("Error al obtener entregas por pedido:", error);
    res.status(500).json({ error: "Error al obtener entregas por pedido" });
  }
};

module.exports = {
  getEntregasByPedido,
  createEntrega,
  getAllEntregas,
  getEntregaById,
  updateEntrega,
  deleteEntrega,
};
