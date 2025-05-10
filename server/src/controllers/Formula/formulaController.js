const { Formula, Cliente, Optica } = require("../../db.js");
const { Op } = require("sequelize");

// Validación básica de campos
const validateFormulaInput = (data) => {
  const errores = [];

  const tiposLenteValidos = [
    "monofocal",
    "bifocal",
    "multifocal",
    "ocupacional",
    "otro",
  ];

  if (!data.fecha) errores.push("La fecha es obligatoria");
  if (!data.optometrista || data.optometrista.length < 2)
    errores.push("Nombre del optometrista inválido");
  if (!data.tipoLente || !tiposLenteValidos.includes(data.tipoLente))
    errores.push("Tipo de lente inválido");
  if (!data.clienteId) errores.push("clienteId es obligatorio");
  if (!data.opticaId) errores.push("opticaId es obligatorio");

  const validarEje = (val) => val == null || (val >= 0 && val <= 180);
  const validarDP = (val) => val == null || (val >= 0 && val <= 100);

  if (!validarEje(data.od_axis)) errores.push("od_axis fuera de rango");
  if (!validarEje(data.os_axis)) errores.push("os_axis fuera de rango");
  if (!validarDP(data.od_dp)) errores.push("od_dp fuera de rango");
  if (!validarDP(data.os_dp)) errores.push("os_dp fuera de rango");

  return errores;
};

// Crear fórmula
const crearFormula = async (req, res) => {
  try {
    const errores = validateFormulaInput(req.body);
    if (errores.length > 0) return res.status(400).json({ errores });

    const { clienteId, opticaId } = req.body;

    // Verificamos existencia de cliente y óptica
    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente)
      return res.status(404).json({ error: "Cliente no encontrado" });

    const optica = await Optica.findByPk(opticaId);
    if (!optica) return res.status(404).json({ error: "Óptica no encontrada" });

    const nuevaFormula = await Formula.create(req.body);
    res.status(201).json(nuevaFormula);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las fórmulas (con cliente y óptica)
const obtenerFormulas = async (req, res) => {
  try {
    const formulas = await Formula.findAll({
      include: [{ model: Cliente }, { model: Optica }],
      order: [["fecha", "DESC"]],
    });
    res.json(formulas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener fórmula por ID
const obtenerFormulaPorId = async (req, res) => {
  try {
    const formula = await Formula.findByPk(req.params.id, {
      include: [{ model: Cliente }, { model: Optica }],
    });
    if (!formula)
      return res.status(404).json({ error: "Fórmula no encontrada" });
    res.json(formula);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar fórmula
const actualizarFormula = async (req, res) => {
  try {
    const errores = validateFormulaInput(req.body);
    if (errores.length > 0) return res.status(400).json({ errores });

    const formula = await Formula.findByPk(req.params.id);
    if (!formula)
      return res.status(404).json({ error: "Fórmula no encontrada" });

    await formula.update(req.body);
    res.json(formula);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar fórmula
const eliminarFormula = async (req, res) => {
  try {
    const formula = await Formula.findByPk(req.params.id);
    if (!formula)
      return res.status(404).json({ error: "Fórmula no encontrada" });

    await formula.destroy();
    res.json({ mensaje: "Fórmula eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearFormula,
  obtenerFormulas,
  obtenerFormulaPorId,
  actualizarFormula,
  eliminarFormula,
};
