const { v4: isUUID } = require("uuid");
const { Proveedores, Optica } = require("../../db");

// Crear un proveedor
const crearProveedor = async (req, res) => {
  try {
    const {
      nombre,
      contacto,
      email,
      telefono,
      direccion,
      tipo,
      notas,
      opticaId,
    } = req.body;

    if (!opticaId || !isUUID(opticaId)) {
      return res
        .status(400)
        .json({ error: "opticaId es obligatorio y debe ser UUID válido." });
    }

    if (!nombre || !telefono) {
      return res
        .status(400)
        .json({ error: "Nombre y teléfono son obligatorios." });
    }

    const optica = await Optica.findByPk(opticaId);
    if (!optica) {
      return res.status(404).json({ error: "Óptica no encontrada." });
    }

    const nuevoProveedor = await Proveedores.create({
      nombre,
      contacto,
      email,
      telefono,
      direccion,
      tipo,
      notas,
      opticaId,
    });

    return res.status(201).json(nuevoProveedor);
  } catch (error) {
    console.error("Error al crear proveedor:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Obtener proveedores por opticaId
const obtenerProveedores = async (req, res) => {
  try {
    const { opticaId } = req.params;

    if (!opticaId || !isUUID(opticaId)) {
      return res
        .status(400)
        .json({ error: "opticaId es requerido y debe ser UUID válido." });
    }

    const proveedores = await Proveedores.findAll({
      where: { opticaId },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(proveedores);
  } catch (error) {
    console.error("Error al obtener proveedores:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Obtener un proveedor por ID
const obtenerProveedorPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isUUID(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const proveedor = await Proveedores.findByPk(id);

    if (!proveedor) {
      return res.status(404).json({ error: "Proveedor no encontrado." });
    }

    return res.status(200).json(proveedor);
  } catch (error) {
    console.error("Error al buscar proveedor:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Actualizar proveedor
const actualizarProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      contacto,
      email,
      telefono,
      direccion,
      tipo,
      notas,
      opticaId,
    } = req.body;

    if (!isUUID(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const proveedor = await Proveedores.findByPk(id);
    if (!proveedor) {
      return res.status(404).json({ error: "Proveedor no encontrado." });
    }

    await proveedor.update({
      nombre,
      contacto,
      email,
      telefono,
      direccion,
      tipo,
      notas,
      opticaId,
    });

    return res.status(200).json(proveedor);
  } catch (error) {
    console.error("Error al actualizar proveedor:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Eliminar proveedor
const eliminarProveedor = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isUUID(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const proveedor = await Proveedores.findByPk(id);
    if (!proveedor) {
      return res.status(404).json({ error: "Proveedor no encontrado." });
    }

    await proveedor.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar proveedor:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  crearProveedor,
  obtenerProveedores,
  obtenerProveedorPorId,
  actualizarProveedor,
  eliminarProveedor,
};
