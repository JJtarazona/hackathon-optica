const { v4: isUUID } = require("uuid");
const { CondicionesFormula, Cliente, Optica } = require("../../db");

// Crear una condición de fórmula
const crearCondicionFormula = async (req, res) => {
  try {
    const { condicion, clienteId, opticaId, formulaId } = req.body;

    // Validaciones
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

    if (formulaId && !isUUID(formulaId)) {
      return res
        .status(400)
        .json({ error: "formulaId debe ser un UUID válido." });
    }

    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado." });
    }

    const optica = await Optica.findByPk(opticaId);
    if (!optica) {
      return res.status(404).json({ error: "Óptica no encontrada." });
    }

    const nuevaCondicion = await CondicionesFormula.create({
      condicion,
      clienteId,
      opticaId,
      formulaId,
    });

    return res.status(201).json(nuevaCondicion);
  } catch (error) {
    console.error("Error al crear condición:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Obtener todas las condiciones
const obtenerCondicionesFormula = async (req, res) => {
  try {
    const condiciones = await CondicionesFormula.findAll();
    return res.status(200).json(condiciones);
  } catch (error) {
    console.error("Error al obtener condiciones:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Obtener una por ID
const obtenerCondicionPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isUUID(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const condicion = await CondicionesFormula.findByPk(id);

    if (!condicion) {
      return res.status(404).json({ error: "Condición no encontrada." });
    }

    return res.status(200).json(condicion);
  } catch (error) {
    console.error("Error al buscar condición:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Actualizar una condición
const actualizarCondicionFormula = async (req, res) => {
  try {
    const { id } = req.params;
    const { condicion, clienteId, opticaId, formulaId } = req.body;

    if (!isUUID(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const condicionExistente = await CondicionesFormula.findByPk(id);

    if (!condicionExistente) {
      return res.status(404).json({ error: "Condición no encontrada." });
    }

    await condicionExistente.update({
      condicion,
      clienteId,
      opticaId,
      formulaId,
    });

    return res.status(200).json(condicionExistente);
  } catch (error) {
    console.error("Error al actualizar condición:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Eliminar una condición
const eliminarCondicionFormula = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isUUID(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const condicion = await CondicionesFormula.findByPk(id);

    if (!condicion) {
      return res.status(404).json({ error: "Condición no encontrada." });
    }

    await condicion.destroy();

    return res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar condición:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  crearCondicionFormula,
  obtenerCondicionesFormula,
  obtenerCondicionPorId,
  actualizarCondicionFormula,
  eliminarCondicionFormula,
};
