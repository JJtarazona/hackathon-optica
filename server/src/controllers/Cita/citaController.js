const { v4: isUUID } = require("uuid");
const { Cita, Cliente, Optica } = require("../../db");

// Crear una cita
const crearCita = async (req, res) => {
  try {
    const {
      fecha,
      hora,
      motivo,
      estado,
      title,
      start,
      end,
      clienteId,
      opticaId,
    } = req.body;

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

    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado." });
    }

    const optica = await Optica.findByPk(opticaId);
    if (!optica) {
      return res.status(404).json({ error: "Óptica no encontrada." });
    }

    const nuevaCita = await Cita.create({
      fecha,
      hora,
      motivo,
      estado,
      title,
      start,
      end,
      clienteId,
      opticaId,
    });

    return res.status(201).json(nuevaCita);
  } catch (error) {
    console.error("Error al crear cita:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Obtener todas las citas
const obtenerCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll();
    return res.status(200).json(citas);
  } catch (error) {
    console.error("Error al obtener citas:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Obtener una cita por ID
const obtenerCitaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isUUID(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const citaEncontrada = await Cita.findByPk(id);

    if (!citaEncontrada) {
      return res.status(404).json({ error: "Cita no encontrada." });
    }

    return res.status(200).json(citaEncontrada);
  } catch (error) {
    console.error("Error al buscar cita:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Actualizar una cita
const actualizarCita = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fecha,
      hora,
      motivo,
      estado,
      title,
      start,
      end,
      clienteId,
      opticaId,
    } = req.body;

    if (!isUUID(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const citaExistente = await Cita.findByPk(id);

    if (!citaExistente) {
      return res.status(404).json({ error: "Cita no encontrada." });
    }

    await citaExistente.update({
      fecha,
      hora,
      motivo,
      estado,
      title,
      start,
      end,
      clienteId,
      opticaId,
    });

    return res.status(200).json(citaExistente);
  } catch (error) {
    console.error("Error al actualizar cita:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Eliminar una cita
const eliminarCita = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isUUID(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const citaExistente = await Cita.findByPk(id);

    if (!citaExistente) {
      return res.status(404).json({ error: "Cita no encontrada." });
    }

    await citaExistente.destroy();

    return res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar cita:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  crearCita,
  obtenerCitas,
  obtenerCitaPorId,
  actualizarCita,
  eliminarCita,
};
