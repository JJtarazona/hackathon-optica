const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("optica", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING, // Este será el ID de Clerk
      allowNull: false,
      unique: true,
    },
  });
};
