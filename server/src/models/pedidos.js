const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("pedidos", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fechaPedido: { type: DataTypes.DATEONLY },
    fechaEstimadaEntrega: { type: DataTypes.DATEONLY },
    estado: {
      type: DataTypes.ENUM,
      values: [
        "Pendiente",
        "En Laboratorio",
        "Enviado",
        "Recibido en Óptica",
        "Listo para Entrega",
        "Entregado",
        "Cancelado",
      ],
      defaultValue: "Pendiente",
    },
    laboratorio: { type: DataTypes.STRING },
    total: { type: DataTypes.DECIMAL(10, 2) },
    notas: { type: DataTypes.TEXT },
    clienteId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    opticaId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
};
