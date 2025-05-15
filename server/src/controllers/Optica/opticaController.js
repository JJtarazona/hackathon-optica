const { Optica } = require("../../db.js");
const crearOptica = async (req, res) => {
  try {
    const nuevaOptica = await Optica.create(req.body);
    res.status(201).json(nuevaOptica);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const obtenerOpticas = async (_req, res) => {
  try {
    const opticas = await Optica.findAll();
    res.json(opticas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const obtenerOpticaPorId = async (req, res) => {
  try {
    const optica = await Optica.findByPk(req.params.id);
    if (!optica) return res.status(404).json({ error: "Óptica no encontrada" });
    res.json(optica);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const validarOptica = async (req, res) => {
  const { id } = req.params;
  try {
    const optica = await Optica.findByPk(id);
    if (!optica) {
      return res.status(404).json({ error: "Óptica no encontrada" });
    }

    res.json(optica);
  } catch (error) {
    console.error("Error al validar óptica:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const actualizarOptica = async (req, res) => {
  try {
    const optica = await Optica.findByPk(req.params.id);
    if (!optica) return res.status(404).json({ error: "Óptica no encontrada" });

    await optica.update(req.body);
    res.json(optica);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const eliminarOptica = async (req, res) => {
  try {
    const optica = await Optica.findByPk(req.params.id);
    if (!optica) return res.status(404).json({ error: "Óptica no encontrada" });

    await optica.destroy();
    res.json({ mensaje: "Óptica eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  crearOptica,
  obtenerOpticas,
  obtenerOpticaPorId,
  actualizarOptica,
  eliminarOptica,
  validarOptica,
};
