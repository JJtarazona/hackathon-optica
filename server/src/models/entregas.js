const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("entregas", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fechaEntrega: { type: DataTypes.DATEONLY },
    notas: { type: DataTypes.TEXT },
    entregadoPor: { type: DataTypes.STRING },
    estado: { type: DataTypes.STRING },
  });
};
