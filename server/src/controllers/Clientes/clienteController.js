const { Cliente, Optica } = require("../../db.js");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

// Crear cliente
const crearCliente = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty())
    return res.status(400).json({ errores: errores.array() });

  const {
    nombre,
    apellido,
    email,
    telefono,
    direccion,
    fechaRegistro,
    deudaPendiente,
    avatarUrl,
    opticaId,
  } = req.body;

  try {
    if (!nombre || !apellido || !email) {
      return res
        .status(400)
        .json({ error: "Nombre, apellido y email son obligatorios" });
    }

    const findOptica = await Optica.findByPk(opticaId);
    if (!findOptica) {
      return res.status(404).json({ error: "Optica no encontrada" });
    }

    const nuevoCliente = await Cliente.create({
      id: uuidv4(),
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      email: email.toLowerCase().trim(),
      telefono,
      direccion,
      fechaRegistro,
      deudaPendiente: parseFloat(deudaPendiente) || 0,
      avatarUrl,
      opticaId,
    });

    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los clientes
const obtenerClientes = async (_req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener cliente por ID
const obtenerClientePorId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== "string")
      return res.status(400).json({ error: "ID inválido" });

    const clienteEncontrado = await Cliente.findByPk(id);
    if (!clienteEncontrado)
      return res.status(404).json({ error: "Cliente no encontrado" });

    res.json(clienteEncontrado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar cliente
const actualizarCliente = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty())
    return res.status(400).json({ errores: errores.array() });

  const { id } = req.params;

  try {
    const clienteExistente = await Cliente.findByPk(id);
    if (!clienteExistente)
      return res.status(404).json({ error: "Cliente no encontrado" });

    if (req.body.email) {
      const emailEnUso = await Cliente.findOne({
        where: { email: req.body.email, id: { [Op.ne]: id } },
      });
      if (emailEnUso)
        return res
          .status(409)
          .json({ error: "Ese email ya está en uso por otro cliente" });
    }

    await clienteExistente.update({
      ...req.body,
      email: req.body.email?.toLowerCase().trim(),
      nombre: req.body.nombre?.trim(),
      apellido: req.body.apellido?.trim(),
    });

    res.json(clienteExistente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar cliente
const eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== "string")
      return res.status(400).json({ error: "ID inválido" });

    const clienteAEliminar = await Cliente.findByPk(id);
    if (!clienteAEliminar)
      return res.status(404).json({ error: "Cliente no encontrado" });

    await clienteAEliminar.destroy();
    res.json({ mensaje: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearCliente,
  obtenerClientes,
  obtenerClientePorId,
  actualizarCliente,
  eliminarCliente,
};
