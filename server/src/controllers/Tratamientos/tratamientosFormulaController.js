const { TratamientosFormula } = require("../../db");

// Función para crear un tratamiento
const crearTratamiento = async (req, res) => {
  const { tratamiento, clienteId, opticaId, formulaId } = req.body;

  // Validaciones
  if (!tratamiento) {
    return res.status(400).json({ error: "El tratamiento es requerido" });
  }

  if (!clienteId) {
    return res.status(400).json({ error: "El clienteId es requerido" });
  }

  if (!opticaId) {
    return res.status(400).json({ error: "El opticaId es requerido" });
  }

  try {
    // Creamos el nuevo tratamiento en la base de datos
    const nuevoTratamiento = await TratamientosFormula.create({
      tratamiento,
      clienteId,
      opticaId,
      formulaId,
    });

    return res.status(201).json({ tratamiento: nuevoTratamiento });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al crear el tratamiento" });
  }
};

// Función para obtener todos los tratamientos
const obtenerTratamientos = async (req, res) => {
  try {
    const tratamientos = await TratamientosFormula.findAll();
    return res.status(200).json({ tratamientos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener tratamientos" });
  }
};

// Función para obtener un tratamiento por su id
const obtenerTratamientoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const tratamiento = await TratamientosFormula.findByPk(id);

    if (!tratamiento) {
      return res.status(404).json({ error: "Tratamiento no encontrado" });
    }

    return res.status(200).json({ tratamiento });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener el tratamiento" });
  }
};

// Función para actualizar un tratamiento
const actualizarTratamiento = async (req, res) => {
  const { id } = req.params;
  const { tratamiento, clienteId, opticaId } = req.body;

  // Validación
  if (!tratamiento || !clienteId || !opticaId) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const tratamientoExistente = await TratamientosFormula.findByPk(id);

    if (!tratamientoExistente) {
      return res.status(404).json({ error: "Tratamiento no encontrado" });
    }

    const tratamientoActualizado = await tratamientoExistente.update({
      tratamiento,
      clienteId,
      opticaId,
    });

    return res.status(200).json({ tratamiento: tratamientoActualizado });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error al actualizar el tratamiento" });
  }
};

// Función para eliminar un tratamiento
const eliminarTratamiento = async (req, res) => {
  const { id } = req.params;

  try {
    const tratamiento = await TratamientosFormula.findByPk(id);

    if (!tratamiento) {
      return res.status(404).json({ error: "Tratamiento no encontrado" });
    }

    await tratamiento.destroy();
    return res.status(200).json({ message: "Tratamiento eliminado" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al eliminar el tratamiento" });
  }
};

module.exports = {
  crearTratamiento,
  obtenerTratamientos,
  obtenerTratamientoPorId,
  actualizarTratamiento,
  eliminarTratamiento,
};
