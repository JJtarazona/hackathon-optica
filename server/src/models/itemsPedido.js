const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("itemsPedido", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cantidad: { type: DataTypes.INTEGER },
    precio: { type: DataTypes.DECIMAL(10, 2) },
  });
};
