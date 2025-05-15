const { Cliente, Optica, Cita, Formula } = require("../../db.js");
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
    if (!nombre || !apellido || !email || !opticaId) {
      return res.status(400).json({
        error: "Nombre, apellido, email  y la opticaId son obligatorios",
      });
    }
    if (!opticaId) {
      return res.status(400).json({ error: "Primero debes crear una optica" });
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

// const obtenerClientesPorOptica = async (req, res) => {
//   const { opticaId } = req.params;

//   try {
//     const clientes = await Cliente.findAll({
//       where: { opticaId },
//       include: [
//         {
//           model: Cita,
//           where: { estado: "Completada" },
//           limit: 1,
//           order: [["fecha", "DESC"]],
//         },
//         {
//           model: Formula,
//           required: false,
//           clienteId: { [Op.ne]: null },
//         },
//       ],
//     });

//     if (!clientes.length) {
//       return res.status(404).json({ error: "No se encontraron clientes" });
//     }

//     const clientesConDatos = clientes.map((cliente) => {
//       const ultimaCita = cliente.Cita?.sort(
//         (a, b) => new Date(b.fecha) - new Date(a.fecha)
//       )[0];

//       const ultimaFormula =
//         cliente.formulas?.sort(
//           (a, b) => new Date(b.fecha) - new Date(a.fecha)
//         )[0] || null;

//       const sumaOD = ultimaFormula
//         ? Number(ultimaFormula.od_sph || 0) + Number(ultimaFormula.od_cyl || 0)
//         : null;

//       const sumaOS = ultimaFormula
//         ? Number(ultimaFormula.os_sph || 0) + Number(ultimaFormula.os_cyl || 0)
//         : null;

//       return {
//         id: cliente.id,
//         nombre: cliente.nombre,
//         apellido: cliente.apellido,
//         telefono: cliente.telefono,
//         direccion: cliente.direccion,
//         ultimaCita: ultimaCita
//           ? {
//               id: ultimaCita.id,
//               fecha: ultimaCita.fecha,
//               motivo: ultimaCita.motivo,
//               estado: ultimaCita.estado,
//             }
//           : null,
//         formula: ultimaFormula
//           ? {
//               id: ultimaFormula.id,
//               fecha: ultimaFormula.fecha,
//               od_sph: ultimaFormula.od_sph,
//               od_cyl: ultimaFormula.od_cyl,
//               os_sph: ultimaFormula.os_sph,
//               os_cyl: ultimaFormula.os_cyl,
//               sumaOD,
//               sumaOS,
//             }
//           : null,
//       };
//     });

//     res.json(clientesConDatos);
//   } catch (error) {
//     console.error("Error al obtener clientes por óptica:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

const obtenerClientesPorOptica = async (req, res) => {
  const { opticaId } = req.params;

  try {
    const clientes = await Cliente.findAll({
      where: { opticaId },
      include: [
        {
          model: Cita,
          required: false,
        },
        {
          model: Formula,
          required: false,
        },
      ],
    });

    if (!clientes.length) {
      return res.status(404).json({ error: "No se encontraron clientes" });
    }

    const clientesConDatos = clientes.map((cliente) => {
      // Ordenar las citas completadas por fecha DESC
      const ultimaCita =
        cliente.cita?.sort(
          (a, b) => new Date(b.fecha) - new Date(a.fecha)
        )[0] || null;

      // Ordenar las fórmulas por fecha DESC
      const ultimaFormula =
        cliente.formulas?.sort(
          (a, b) => new Date(b.fecha) - new Date(a.fecha)
        )[0] || null;

      const sumaOD = ultimaFormula
        ? Number(ultimaFormula.od_sph || 0) + Number(ultimaFormula.od_cyl || 0)
        : null;

      const sumaOS = ultimaFormula
        ? Number(ultimaFormula.os_sph || 0) + Number(ultimaFormula.os_cyl || 0)
        : null;

      const ultimaRX = ultimaCita ? ultimaCita.fecha : null;

      return {
        id: cliente.id,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        telefono: cliente.telefono,
        direccion: cliente.direccion,
        email: cliente.email,
        ultimaRX: ultimaRX,
        ultimaCita: ultimaCita
          ? {
              id: ultimaCita.id,
              fecha: ultimaCita.fecha,
              motivo: ultimaCita.motivo,
              estado: ultimaCita.estado,
            }
          : null,
        formula: ultimaFormula
          ? {
              id: ultimaFormula.id,
              condiciones: ultimaFormula.condiciones,
              fecha: ultimaFormula.fecha,
              od_sph: ultimaFormula.od_sph,
              od_cyl: ultimaFormula.od_cyl,
              os_sph: ultimaFormula.os_sph,
              os_cyl: ultimaFormula.os_cyl,
              sumaOD,
              sumaOS,
            }
          : null,
      };
    });

    res.json(clientesConDatos);
  } catch (error) {
    console.error("Error al obtener clientes por óptica:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearCliente,
  obtenerClientes,
  obtenerClientePorId,
  actualizarCliente,
  eliminarCliente,
  obtenerClientesPorOptica,
};
