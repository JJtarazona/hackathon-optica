const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("facturas", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fechaFactura: { type: DataTypes.DATEONLY },
    total: { type: DataTypes.DECIMAL(10, 2) },
    metodoPago: { type: DataTypes.STRING },
    estado: {
      type: DataTypes.ENUM,
      values: [
        "Pendiente",
        "Pagada",
        "Parcialmente Pagada",
        "Vencida",
        "Cancelada",
      ],
      defaultValue: "Pendiente",
    },
  });
};
