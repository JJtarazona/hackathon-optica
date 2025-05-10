const { Inventario, Optica } = require("../../db");
const { v4: isUUID } = require("uuid");

// Crear un nuevo producto en el inventario
const crearProducto = async (req, res) => {
  try {
    const {
      tipo,
      nombre,
      marca,
      material,
      color,
      indice,
      duracion,
      stock,
      precioCompra,
      precioVenta,
      opticaId,
    } = req.body;

    if (
      !tipo ||
      !nombre ||
      !stock ||
      !precioCompra ||
      !precioVenta ||
      !opticaId
    ) {
      return res.status(400).json({ error: "Faltan campos obligatorios." });
    }

    const tiposValidos = [
      "Armazón",
      "Lente Oftálmico",
      "Gafa de Sol",
      "Lente de Contacto",
      "Accesorio",
      "Otro",
    ];

    if (!tiposValidos.includes(tipo)) {
      return res.status(400).json({ error: "Tipo de producto no válido." });
    }

    if (!isUUID(opticaId)) {
      return res.status(400).json({ error: "opticaId debe ser UUID válido." });
    }

    const optica = await Optica.findByPk(opticaId);
    if (!optica) {
      return res.status(404).json({ error: "Óptica no encontrada." });
    }

    const nuevoProducto = await Inventario.create({
      tipo,
      nombre,
      marca,
      material,
      color,
      indice,
      duracion,
      stock,
      precioCompra,
      precioVenta,
      opticaId,
    });

    return res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error("Error al crear producto:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Obtener todos los productos
const obtenerInventario = async (req, res) => {
  try {
    const { opticaId } = req.params;
    if (!opticaId) {
      return res.status(400).json({ error: "opticaId es obligatorio." });
    }

    if (!isUUID(opticaId)) {
      return res.status(400).json({ error: "opticaId debe ser UUID válido." });
    }

    const optica = await Optica.findByPk(opticaId);
    if (!optica) {
      return res.status(404).json({ error: "Óptica no encontrada." });
    }

    const productos = await Inventario.findAll({
      where: { opticaId },
      include: [{ model: Optica }],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener inventario:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Obtener producto por ID
const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isUUID(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const producto = await Inventario.findByPk(id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    return res.status(200).json(producto);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Actualizar producto
const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const campos = req.body;

    if (!isUUID(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const producto = await Inventario.findByPk(id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    await producto.update(campos);

    return res.status(200).json(producto);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Eliminar producto
const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isUUID(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const producto = await Inventario.findByPk(id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    await producto.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  crearProducto,
  obtenerInventario,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
};
