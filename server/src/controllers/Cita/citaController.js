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
      optometrista,
      opticaId,
      notas,
      clienteNombre,
      clienteEmail,
      clienteTelefono,
    } = req.body;

    console.log("Datos de la cita:", req.body);

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
      optometrista,
      opticaId,
      notas,
      clienteNombre,
      clienteEmail,
      clienteTelefono,
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
    const citas = await Cita.findAll({
      include: [
        {
          model: Cliente,
          attributes: ["id", "nombre", "apellido", "email", "telefono"],
        },
      ],
      attributes: [
        "id",
        "fecha",
        "hora",
        "motivo",
        "estado",
        "optometrista",
        "notas",
        "createdAt",
        "updatedAt",
      ],
      order: [["fecha", "DESC"]],
    });

    const citasTransformadas = citas.map((cita) => {
      const cliente = cita.cliente || {};
      return {
        id: cita.id,
        fecha: cita.fecha,
        hora: cita.hora,
        motivo: cita.motivo,
        notas: cita.notas,
        estado: cita.estado,
        optometrista: cita.optometrista,
        createdAt: cita.createdAt,
        updatedAt: cita.updatedAt,
        clienteId: cliente.id,
        clienteNombre: cliente.nombre + " " + cliente.apellido,
        clienteEmail: cliente.email,
        clienteTelefono: cliente.telefono,
      };
    });

    return res.status(200).json(citasTransformadas);
  } catch (error) {
    console.error("Error al obtener citas:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Obtener una cita por ID
const obtenerCitaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const citas = await Cita.findAll({
      where: { id },
      include: [
        {
          model: Cliente,
          attributes: ["id", "nombre", "apellido", "email", "telefono"],
        },
      ],
      attributes: [
        "id",
        "fecha",
        "hora",
        "motivo",
        "estado",
        "optometrista",
        "notas",
        "createdAt",
        "updatedAt",
        "clienteNombre",
        "clienteEmail",
        "clienteTelefono",
      ],
      order: [["fecha", "DESC"]],
    });

    const citasTransformadas = citas.map((cita) => {
      const cliente = cita.cliente || {};
      return {
        id: cita.id,
        fecha: cita.fecha,
        hora: cita.hora,
        motivo: cita.motivo,
        notas: cita.notas,
        estado: cita.estado,
        optometrista: cita.optometrista,
        clienteNombre: cita.clienteNombre,
        clienteEmail: cita.clienteEmail,
        clienteTelefono: cita.clienteTelefono,
        createdAt: cita.createdAt,
        updatedAt: cita.updatedAt,
        clienteId: cliente.id,
        // clienteNombre: cliente.nombre + " " + cliente.apellido,
        // clienteEmail: cliente.email,
        // clienteTelefono: cliente.telefono,
      };
    });

    return res.status(200).json(citasTransformadas);
  } catch (error) {
    console.error("Error al obtener citas:", error);
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
      notas,
      optometrista,
      clienteNombre,
      clienteEmail,
      clienteTelefono,
    } = req.body;

    console.log("Datos de la cita:", req.body);

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
      notas,
      clienteNombre,
      optometrista,
      clienteEmail,
      clienteTelefono,
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

const getCitasByOpticaId = async (req, res) => {
  try {
    const { opticaId } = req.params;
    const citas = await Cita.findAll({ where: { opticaId } });
    res.status(200).json(citas);
  } catch (error) {
    console.error("Error al obtener citas por opticaId:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  getCitasByOpticaId,
  crearCita,
  obtenerCitas,
  obtenerCitaPorId,
  actualizarCita,
  eliminarCita,
};
