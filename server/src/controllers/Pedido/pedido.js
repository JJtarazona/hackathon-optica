const { Pedidos, Cliente, Optica } = require("../../db");
const { v4: isUUID } = require("uuid");

// Crear un pedido
const crearPedido = async (req, res) => {
  try {
    const {
      fechaPedido,
      fechaEstimadaEntrega,
      estado,
      laboratorio,
      total,
      notas,
      clienteId,
      opticaId,
    } = req.body;

    // Validar datos obligatorios
    if (!clienteId || !opticaId) {
      return res
        .status(400)
        .json({ error: "clienteId y opticaId son obligatorios." });
    }

    if (!isUUID(clienteId) || !isUUID(opticaId)) {
      return res
        .status(400)
        .json({ error: "IDs deben tener formato UUID válido." });
    }

    // Validar existencia de cliente y óptica
    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado." });
    }

    const optica = await Optica.findByPk(opticaId);
    if (!optica) {
      return res.status(404).json({ error: "Óptica no encontrada." });
    }

    // Crear el pedido
    const nuevoPedido = await Pedidos.create({
      fechaPedido,
      fechaEstimadaEntrega,
      estado,
      laboratorio,
      total,
      notas,
      clienteId,
      opticaId,
    });

    return res.status(201).json(nuevoPedido);
  } catch (error) {
    console.error("Error al crear pedido:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Obtener todos los pedidos
const obtenerPedidos = async (req, res) => {
  try {
    const { opticaId } = req.params;

    // Si se proporciona opticaId, filtrar por óptica
    if (opticaId) {
      if (!isUUID(opticaId)) {
        return res.status(400).json({ error: "ID de óptica inválido." });
      }

      const pedidos = await Pedidos.findAll({
        where: { opticaId },
      });

      if (pedidos.length === 0) {
        return res
          .status(404)
          .json({ error: "No se encontraron pedidos para esta óptica." });
      }

      return res.status(200).json(pedidos);
    }

    // Si no se proporciona opticaId, devolver todos los pedidos
    const pedidos = await Pedidos.findAll();
    return res.status(200).json(pedidos);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Obtener un pedido por ID
const obtenerPedidoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isUUID(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const pedidoEncontrado = await Pedidos.findByPk(id);

    if (!pedidoEncontrado) {
      return res.status(404).json({ error: "Pedido no encontrado." });
    }

    return res.status(200).json(pedidoEncontrado);
  } catch (error) {
    console.error("Error al buscar pedido:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Obtener pedidos filtrados por opticaId
const obtenerPedidosPorOptica = async (req, res) => {
  try {
    const { opticaId } = req.params;

    if (!isUUID(opticaId)) {
      return res.status(400).json({ error: "ID de óptica inválido." });
    }

    const pedidos = await Pedidos.findAll({
      where: { opticaId },
    });

    if (pedidos.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontraron pedidos para esta óptica." });
    }

    return res.status(200).json(pedidos);
  } catch (error) {
    console.error("Error al obtener pedidos de óptica:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Actualizar un pedido
const actualizarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fechaPedido,
      fechaEstimadaEntrega,
      estado,
      laboratorio,
      total,
      notas,
      clienteId,
      opticaId,
    } = req.body;

    if (!isUUID(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const pedidoExistente = await Pedidos.findByPk(id);

    if (!pedidoExistente) {
      return res.status(404).json({ error: "Pedido no encontrado." });
    }

    await pedidoExistente.update({
      fechaPedido,
      fechaEstimadaEntrega,
      estado,
      laboratorio,
      total,
      notas,
      clienteId,
      opticaId,
    });

    return res.status(200).json(pedidoExistente);
  } catch (error) {
    console.error("Error al actualizar pedido:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Eliminar un pedido
const eliminarPedido = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isUUID(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const pedidoExistente = await Pedidos.findByPk(id);

    if (!pedidoExistente) {
      return res.status(404).json({ error: "Pedido no encontrado." });
    }

    await pedidoExistente.destroy();

    return res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar pedido:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  crearPedido,
  obtenerPedidos,
  obtenerPedidoPorId,
  obtenerPedidosPorOptica,
  actualizarPedido,
  eliminarPedido,
};
