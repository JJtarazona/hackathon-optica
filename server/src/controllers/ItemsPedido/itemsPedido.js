const { ItemsPedido, Pedidos, Inventario, Optica } = require("../../db");
const { Op } = require("sequelize");

// Validación básica de datos
const validateItemData = (data) => {
  const errors = [];
  if (!data.cantidad || isNaN(data.cantidad) || data.cantidad <= 0) {
    errors.push("Cantidad debe ser un número mayor a 0.");
  }
  if (!data.precio || isNaN(data.precio) || parseFloat(data.precio) <= 0) {
    errors.push("Precio debe ser un número mayor a 0.");
  }
  if (!data.pedidoId) {
    errors.push("pedidoId es obligatorio.");
  }
  if (!data.inventarioId) {
    errors.push("inventarioId es obligatorio.");
  }
  return errors;
};

// Crear un itemPedido
const createItemPedido = async (req, res) => {
  const { pedidoId, inventarioId, opticaId } = req.body;

  try {
    const errors = validateItemData(req.body);
    if (errors.length > 0) return res.status(400).json({ errors });

    const pedidoExistente = await Pedidos.findByPk(pedidoId);
    if (!pedidoExistente) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    const inventarioExistente = await Inventario.findByPk(inventarioId);
    if (!inventarioExistente) {
      return res.status(404).json({ error: "Inventario no encontrado" });
    }

    const opticaExistente = await Optica.findByPk(opticaId);
    if (!opticaExistente) {
      return res.status(404).json({ error: "Óptica no encontrada" });
    }

    const newItem = await ItemsPedido.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error al crear itemPedido:", error);
    res.status(500).json({ error: "Error al crear itemPedido" });
  }
};
// Obtener todos los ItemsPedido
const getAllItemsPedido = async (req, res) => {
  try {
    const items = await ItemsPedido.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los items" });
  }
};

// Obtener un itemPedido por ID
const getItemPedidoById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await ItemsPedido.findByPk(id);
    if (!item) return res.status(404).json({ error: "Item no encontrado" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el item" });
  }
};

// Actualizar un itemPedido
const updateItemPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await ItemsPedido.findByPk(id);
    if (!item) return res.status(404).json({ error: "Item no encontrado" });

    const errors = validateItemData(req.body);
    if (errors.length > 0) return res.status(400).json({ errors });

    await item.update(req.body);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el item" });
  }
};

// Eliminar un itemPedido
const deleteItemPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await ItemsPedido.findByPk(id);
    if (!item) return res.status(404).json({ error: "Item no encontrado" });

    await item.destroy();
    res.json({ message: "Item eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el item" });
  }
};

// Obtener items por pedidoId
const getItemsByPedidoId = async (req, res) => {
  try {
    const { pedidoId } = req.params;

    // Opcional: verificar si el pedido existe
    const pedidoExistente = await Pedidos.findByPk(pedidoId);
    if (!pedidoExistente) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    const items = await ItemsPedido.findAll({
      where: { pedidoId },
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los items por pedidoId" });
  }
};

module.exports = {
  createItemPedido,
  getAllItemsPedido,
  getItemPedidoById,
  updateItemPedido,
  deleteItemPedido,
  getItemsByPedidoId,
};
