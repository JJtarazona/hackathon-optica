const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("cita", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fecha: { type: DataTypes.DATEONLY },
    hora: { type: DataTypes.TIME },
    motivo: { type: DataTypes.STRING },
    estado: {
      type: DataTypes.ENUM,
      values: [
        "Pendiente",
        "Confirmada",
        "Cancelada",
        "Completada",
        "No Asistió",
      ],
      defaultValue: "Pendiente",
    },
    title: { type: DataTypes.STRING },
    start: { type: DataTypes.DATE },
    end: { type: DataTypes.DATE },
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
